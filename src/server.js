console.log("server.js")
import { blah } from './environment';
import express from "express";
import cors from "cors";
import path from "path";
import { setupExpressHotUpdateMiddleware, getDevEnvConfigPathObj } from "./dev.config";
import { getProdEnvConfigPathObj, staticFilesPath } from "./prod.config";
import dotenv from "dotenv";
import { generateTemplate } from "./index.js";
import { devMode } from "./utils/utils.js";
import { serverConfig } from './environment';
const formidable = require("express-formidable");

const server = express();
server.use(formidable());

// PATHS
const STATIC_ASSETS_PATH = path.resolve(path.join(__dirname, '..', 'assets'));
const INDEX_FILE_PATH = path.join(__dirname, '..', 'public', 'index.html');
const BUNDLE_PATH = path.join(__dirname, '..', 'public', 'build', 'bundle.js');
const CSS_PATH = path.join(__dirname, '..', 'public', 'build', 'main.css');

/* ENVIRONMENT */

if (devMode()) {
  setupExpressHotUpdateMiddleware(server);
  dotenv.config(getDevEnvConfigPathObj());
} else {
  dotenv.config(getProdEnvConfigPathObj());
  server.get("/static/build/bundle.js", (request, response) => {
    response.status(200).sendFile(BUNDLE_PATH)
  });

  server.get("/static/build/main.css", (request, response) => {
    response.status(200).sendFile(CSS_PATH)
  });
}

server.use("/static", cors(), express.static(STATIC_ASSETS_PATH));

import {
  currentlySelectedMedia,
  viewerStatusResponse,
  createProject,
  createProjectSlideshows,
  createProjectLocalVideos,
  createStory,
  createSlideshow,
  createSlideshowImages,
  createLocalVideos,
  createImages,
  getAllImages,
  getAllProjects,
  getAllLocalVideos,
  waitForMediaToBeSelected,
  getProjectLocalVideos,
  getProjectStories,
  getProjectSlideshows,
  getAllSlideshows,
  getAllSlideshowsWithImageCount,
  getRequestedMedia,
  getSlideshowImages,
  updateViewerStatusResponse,
} from "./crud.js";

const getMode = () => (devMode() ? "dev" : "prod");


const addSlideshowIdToImageObject = (slideshowId, imagesToAddToSlideshow) =>
  imagesToAddToSlideshow.map((image) => {
    image.slideshowId = slideshowId;
    return image;
  });

// API

server.post("/admin/create/story", (req, res, next) =>
  createStory(req.fields)
    .then((result) => res.status(200).json({ response: "Story created" }))
    .catch((err) => next(err))
);

server.post("/launch/project/:projectId/:mediaType/:mediaId", (req, res, next) =>
  getRequestedMedia(req.params.mediaType, req.params.projectId, req.params.mediaId)
    .then((response) => res.status(200).json({ response: viewerStatusResponse }))
    .catch((err) => next(err))
);

server.get("/slideshow/all/", (req, res, next) => {
  getAllSlideshowsWithImageCount()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => next(err));
});

server.get(`/get/project/:projectId/slideshows/`, (req, res, next) => {
  getProjectSlideshows(req.params.projectId)
    .then((results) => res.status(200).json(results))
    .catch((err) => next(err));
});

server.get(`/get/project/:projectId/stories/`, (req, res, next) => {
  getProjectStories(req.params.projectId)
    .then((results) => res.status(200).json(results))
    .catch((err) => next(err));
});

server.get(`/get/project/:projectId/video/local/`, (req, res, next) => {
  getProjectLocalVideos(req.params.projectId)
    .then((results) => res.status(200).json(results))
    .catch((err) => next(err));
});

server.post("/admin/create/slideshowImages/", (req, res, next) => {
  createSlideshowImages(addSlideshowIdToImageObject(req.fields.selectedSlideshow, req.fields.imagesToAddToSlideshow))
    .then((result) => res.status(200).json({ response: "Slideshow images created" }))
    .catch((err) => next(err));
});

server.get("/slideshow/:slideshowId", (req, res, next) => {
  getSlideshowImages(req.params.slideshowId)
    .then((results) => res.status(200).json(results))
    .catch((err) => next(err));
});

server.get("/view/", async (req, res) => {
  await waitForMediaToBeSelected();
  updateViewerStatusResponse("Viewer is not currently waiting for media");
  res.status(200).json(currentlySelectedMedia);
});

server.get("/get/projects/", (req, res, next) => {
  // connection.connect(dbConnectionErrorHandler);
  getAllProjects()
    .then((results) => res.status(200).json(results))
    .catch((err) => next(err));
});

server.get("/admin/get/images/", (req, res, next) => {
  getAllImages()
    .then((results) => res.status(200).json(results))
    .catch((err) => next(err));
});

server.get("/admin/get/stories/", (req, res, next) => {
  getProjectStories(req.fields.projectId)
    .then((results) => res.json(results))
    .catch((err) => next(err));
});

server.get("/admin/get/localVideo/", (req, res, next) => {
  getAllLocalVideos()
    .then((results) => res.json(results))
    .catch((err) => next(err));
});

server.post("/admin/create/project/", (req, res, next) => {
  createProject(req.fields.projectName)
    .then((response) => res.status(200).json({ response: "Project created" }))
    .catch((err) => next(err));
});

server.post("/admin/create/project-media/slideshows/", (req, res, next) => {
  createProjectSlideshows(req.fields.slideshowsToAdd)
    .then((results) => res.status(200).json({ response: "Slideshows added to project" }))
    .catch((err) => next(err));
});

server.post("/admin/create/project-media/local-videos/", (req, res, next) => {
  createProjectLocalVideos(req.fields.localVideosToAdd)
    .then((response) => res.status(200).json({ response: "Local videos added to project" }))
    .catch((err) => next(err));
});

server.post("/admin/create/localVideo/", (req, res, next) => {
  createLocalVideos(req.fields.localVideosToAdd)
    .then((response) => res.status(200).json({ response: "Local videos created" }))
    .catch((err) => next(err));
});

server.post("/admin/create/slideshow/", (req, res, next) => {
  createSlideshow(req.fields.slideshowName)
    .then((response) => res.status(200).json({ response: "Slideshow created" }))
    .catch((err) => next(err));
});

server.post("/admin/create/images/", (req, res, next) => {
  createImages(req.fields.filteredImagesToAdd)
    .then((response) => res.status(200).json({ response: "Images created" }))
    .catch((err) => next(err));
});

// Views

server.get("/admin/", (req, res) => {
  res.send(generateTemplate(getMode(), "admin"));
});

server.get("/viewer/", (req, res) => {
  res.send(generateTemplate(getMode(), "app-viewer"));
});

server.get("/*", (req, res) => {
  res.send(generateTemplate(getMode(), "app-launcher"));
});

server.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({ message: "Internal server error occurred" });
});

server.listen(serverConfig.severPort, serverConfig.serverAddress);
console.log(`Serving at http://${serverConfig.serverAddress}:${serverConfig.severPort}`);
