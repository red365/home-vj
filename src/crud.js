import DatabaseConnector from "./utils/DatabaseConnector";
import { convertBooleanToBinary, convertBinaryToBoolean } from "./utils/utils";
import queries from "./queries";
import { dbConfig } from './environment';
import _ from "lodash";

var connection = new DatabaseConnector(dbConfig);
console.log("The database is: ", dbConfig.database);

var resolveWaitForSelectedMedia;
export var currentlySelectedMedia;
export var viewerStatusResponse = "Viewer is not currently waiting for media";

export function waitForMediaToBeSelected() {
  const promise = new Promise((resolve, reject) => {
    resolveWaitForSelectedMedia = resolve;
  });
  return promise;
}

export function updateViewerStatusResponse(responseMessage) {
  viewerStatusResponse = responseMessage;
}

function sendProjectSlideshow(projectId, mediaId) {
  return connection.query(queries.getProjectSlideshow(), [projectId, mediaId]).then((getProjectSlideshowResults) => {
    var responseObj = {
      random: getProjectSlideshowResults[0].random,
      mediaType: "slideshow",
    };

    getSlideshowImages(mediaId).then((getSlideshowImagesResults) => {
      responseObj.slideshowImages = getSlideshowImagesResults;
      currentlySelectedMedia = responseObj;

      if (resolveWaitForSelectedMedia) {
        resolveWaitForSelectedMedia();
        viewerStatusResponse = "Slideshow is being loaded";
      }
    });
  });
}

function sendProjectLocalVideo(projectId, mediaId, res) {
  viewerStatusResponse = "Viewer is not currently waiting for media";
  const responseObj = { mediaType: "localVideo" };
  return connection.query(queries.getProjectLocalVideo(), [projectId, mediaId]).then((results) => {
    responseObj.filename = results[0].filename;
    responseObj.projectId = results[0].projectId;
    responseObj.videoDuration = results[0].videoDuration;
    responseObj.startAtPosition = results[0].startAtPosition;
    responseObj.playbackRate = results[0].playbackRate;

    currentlySelectedMedia = responseObj;
    if (resolveWaitForSelectedMedia) {
      resolveWaitForSelectedMedia();
      viewerStatusResponse = "Video is being loaded";
    }
  });
}

function sendProjectStoryMedia(projectId, storyId) {
  viewerStatusResponse = "Viewer is not currently waiting for media";
  return connection.query(queries.getStory(), [storyId]).then((story) => {
    connection.query(queries.getStorySlideshows(), [storyId]).then((storySlideshows) => {
      connection.query(queries.getStorySlideshowImages(), [storyId]).then((storySlideshowImages) => {
        connection.query(queries.getStoryLocalVideos(), [storyId]).then((storyLocalVideos) => {
          const compositeData = getCompositeStoryDataObj(story, storySlideshows, storySlideshowImages, storyLocalVideos);

          currentlySelectedMedia = compositeData;
          if (resolveWaitForSelectedMedia) {
            resolveWaitForSelectedMedia();
            viewerStatusResponse = "Story is being loaded";
          }
        });
      });
    });
  });
}

function getCompositeStoryDataObj(story, storySlideshows, slideshowImages, storyLocalVideos) {
  const groupedSlideshowImages = storySlideshows ? _.groupBy(slideshowImages, "slideshowId") : undefined;

  return {
    mediaType: "story",
    storyType: story[0].storyType,
    storyName: story[0].name,
    alternateMediaType: convertBinaryToBoolean(story[0].alternateMediaType),
    random: convertBinaryToBoolean(story[0].random),
    slideshows: storySlideshows ? addImagesToSlideshows(storySlideshows, groupedSlideshowImages) : [],
    localVideos: storyLocalVideos ? storyLocalVideos.map((video) => ({ ...video, mediaType: "localVideo" })) : [],
  };
}

function getCreateSlideshowStoryItemQueryArgs(item) {
  return [item.storyId, item.slideshowId, convertBooleanToBinary(item.random), convertBooleanToBinary(item.playEntireSlideshow), item.slideshowDuration, item.slideDuration || "NULL", item.mediaIndex];
}

function getCreateLocalVideoStoryItemQueryArgs(item) {
  return [item.storyId, item.localVideoId, item.videoDuration || "NULL", item.startAtPosition || "NULL", item.playbackSpeed || "NULL", convertBooleanToBinary(item.playEntireVideo), item.mediaIndex, item.bookmarkVideo];
}

async function multipleDatabaseWrite(dataToWrite, query, args) {
  return await Promise.all(
    dataToWrite.map((data, i) => {
      return connection.query(
        query,
        args.map((arg) => data[arg])
      );
    })
  );
}

async function writeStoryItems(storyItems, storyId) {
  let queryArgs;
  let query;
  await Promise.all(
    storyItems.map((item, i) => {
      if (item.mediaType == "slideshow") {
        queryArgs = getCreateSlideshowStoryItemQueryArgs({ ...item, storyId, mediaIndex: i });
        query = queries.insertStorySlideshow();
      } else {
        queryArgs = getCreateLocalVideoStoryItemQueryArgs({ ...item, storyId, mediaIndex: i });
        query = queries.insertStoryLocalVideo();
      }

      return connection.query(query, queryArgs);
    })
  );
}

export function addImagesToSlideshows(slideshows, groupedSlideshowImages) {
  const slideshowsWithImages = slideshows.map((slideshow) => ({
    ...slideshow,
    mediaType: "slideshow",
  }));
  slideshowsWithImages.forEach((slideshow) => (slideshow.slideshowImages = groupedSlideshowImages[slideshow.slideshowId]));
  return slideshowsWithImages;
}

export function getSlideshowImages(slideshowId) {
  return connection.query(queries.getSlideshowImages(), [slideshowId]);
}

export function createStory(params) {
  const { storyType, storyName, alternateMediaType, randomiseMedia, selectedProject, storyMediaItems } = params;

  return connection.query(queries.insertStory(), [storyType, storyName, convertBooleanToBinary(alternateMediaType), convertBooleanToBinary(randomiseMedia)]).then((storyQueryResults) => {
    connection.query(queries.insertProjectStory(), [selectedProject, storyQueryResults.insertId]).then((projectStoryResults) => {
      writeStoryItems(storyMediaItems, storyQueryResults.insertId);
    });
  });
}

export function getRequestedMedia(mediaType, projectId, mediaId) {
  const requestMap = {
    slideshow: sendProjectSlideshow,
    localVideo: sendProjectLocalVideo,
    story: sendProjectStoryMedia,
  };
  return requestMap[mediaType](projectId, mediaId);
}

export function getAllSlideshows() {
  return connection.query(queries.getAllSlideshows());
}

export function getAllSlideshowsWithImageCount() {
  return connection.query(queries.getAllSlideshowsWithImageCount());
}

export function getProjectSlideshows(projectId) {
  return connection.query(queries.getProjectSlideshows(), [projectId]);
}

export function getProjectStories(projectId) {
  return connection.query(queries.getProjectStories(), [projectId]);
}

export function getProjectLocalVideos(projectId) {
  return connection.query(queries.getProjectLocalVideos(), [projectId]);
}

export function createSlideshowImages(imagesToAddToSlideshow) {
  return multipleDatabaseWrite(imagesToAddToSlideshow, queries.insertSlideShowImage(), ["slideshowId", "imageId", "positionInSlideshow"]);
}

export function getAllLocalVideos() {
  return connection.query(queries.getAllLocalVideos(), []);
}

export function getAllProjects() {
  return connection.query(queries.getAllProjects(), []);
}

export function getAllImages() {
  return connection.query(queries.getAllImages(), []);
}

export function getProjetStories(projectId) {
  return connection.query(queries.getProjectStories, [projectId]);
}

export function createProject(projectName) {
  return connection.query(queries.insertProject(), [projectName]);
}

export function createProjectSlideshows(slideshowsToAdd) {
  return multipleDatabaseWrite(slideshowsToAdd, queries.insertProjectSlideshow(), ["projectId", "slideshowId", "random"]);
}

export function createProjectLocalVideos(localVideosToAdd) {
  return multipleDatabaseWrite(localVideosToAdd, queries.insertProjectLocalVideo(), ["projectId", "videoId", "startAtPosition"]);
}

export function createLocalVideos(localVideosToAdd) {
  return multipleDatabaseWrite(localVideosToAdd, queries.insertLocalVideo(), ["videoDescription", "videoFilename", "videoDuration"]);
}

export function createSlideshow(slideshowName) {
  return connection.query(queries.insertSlideshow(), [slideshowName]);
}

export function createImages(imagesToAdd) {
  return multipleDatabaseWrite(imagesToAdd, queries.insertImage(), ["descriptionValue", "filenameValue"]);
}
