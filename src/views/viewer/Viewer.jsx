import React, { Component } from 'react';
import SlideshowButtons from './controls/SlideshowButtons';
import SlideshowWrapper from './wrappers/SlideshowWrapper';
import VideoPlayerWrapper from './wrappers/VideoPlayerWrapper';
import utils from '../../utils/utils';
import _ from 'lodash';
import Slideshow from '../../media-types/Slideshow';
import LocalVideo from '../../media-types/LocalVideo';
import './viewer.css'

class Viewer extends Component {

  state = {
    mediaToDisplay: undefined,
    playOrder: undefined,
    videoBookmarks: undefined,
    scheduledTimers: [],
    currentStoryItemIndex: undefined,
    storyConfig: undefined,
    activeBookmarkIndex: undefined
  }

  isRandomRoutineWithAlternatingMediaType = (story) => story.storyType == "routine" && story.random && story.alternateMediaType;

  storyHasOneItemOrLess = (playOrder) => playOrder.length <= 1;

  previousAndCurrentStoryItemsAreSlideshow = (playOrder, h, i) => playOrder[h].mediaType == "slideshow" && playOrder[i].mediaType == "slideshow";

  addPadding = (i, orderWithPadding) => {
    orderWithPadding.splice(i, 0, { mediaType: "padding", getDurationInMs: () => 1000 });
  }

  addPaddingIfSlideshowsAreConsecutive = (playOrder, storyType) => {
    const orderWithPadding = [...playOrder];
    for (let i = playOrder.length - 1; i >= 0; i--) {
      let previousAndCurrentStoryItemsAreSlideshow = undefined;
      if (storyType == "routine") {
        previousAndCurrentStoryItemsAreSlideshow = i == 0 ? this.previousAndCurrentStoryItemsAreSlideshow(playOrder, playOrder.length - 1, i) : this.previousAndCurrentStoryItemsAreSlideshow(playOrder, i - 1, i);
      } else {
        previousAndCurrentStoryItemsAreSlideshow = i > 0 ? this.previousAndCurrentStoryItemsAreSlideshow(playOrder, i - 1, i) : undefined;
      }

      if (previousAndCurrentStoryItemsAreSlideshow) {
        this.addPadding(i, orderWithPadding);
      }
    }
    return orderWithPadding;
  }

  ensureNoConsecutiveSlideshows = (playOrder, storyType) => {
    // Pads the play order so Simple React Lighbox is forced to re-render and respect any settings changes between slideshows
    if (this.storyHasOneItemOrLess(playOrder)) {
      return playOrder;
    } else {
      return this.addPaddingIfSlideshowsAreConsecutive(playOrder, storyType);
    }
  }

  createPlayOrder = (story) => {
    var playOrder = [];

    if (this.isRandomRoutineWithAlternatingMediaType(story)) {
      story.slideshows = story.slideshows ? utils.randomise(story.slideshows) : story.slideshows;
      story.localVideos = story.localVideos ? utils.randomise(story.localVideos) : story.localVideos;
      playOrder = utils.alternateMediaType([story.slideshows, story.localVideos]);
    } else if (story.random) {
      playOrder = utils.randomise(playOrder.concat(story.slideshows).concat(story.localVideos));
    } else {
      playOrder = _.sortBy(story.slideshows.concat(story.localVideos), "mediaIndex");
    }
    return this.ensureNoConsecutiveSlideshows(playOrder, story.storyType);
  }

  clearTimeouts = () => {
    // dummy timeout to get highest id:
    var timeoutId = setTimeout(() => null, 0);
    while (timeoutId--) {
      clearTimeout(timeoutId);
    }
  }

  shouldRepeatStory = () => this.state.currentStoryItemIndex + 1 >= this.state.playOrder.length && this.state.storyConfig.storyType == "routine";

  getNextStoryItemIndex = () => {
    let nextStoryItemIndex = undefined;
    const { currentStoryItemIndex, playOrder } = this.state;

    if (this.shouldRepeatStory()) {
      nextStoryItemIndex = 0;
    } else if (currentStoryItemIndex + 1 < playOrder.length) {
      nextStoryItemIndex = currentStoryItemIndex + 1;
    }
    return nextStoryItemIndex;
  }

  closeLightbox = () => {
    document.getElementById("closeLightbox").click()
  };

  configureStoryItemToDisplay = (storyType) => {
    const { playOrder, playthroughs, mediaToDisplay } = this.state;
    this.closeLightbox();
    const nextStoryItemIndex = this.getNextStoryItemIndex();
    if (nextStoryItemIndex >= 0) {
      this.scheduleNextStoryItem(storyType, playOrder[nextStoryItemIndex]);
      this.setState({
        currentStoryItemIndex: nextStoryItemIndex,
        mediaToDisplay: playOrder[nextStoryItemIndex],
        playthroughs: this.shouldRepeatStory() ? playthroughs + 1 : playthroughs,
      });
    }
  }

  scheduleNextStoryItem = (storyType, storyItem) => {
    setTimeout(() => {
      this.configureStoryItemToDisplay(storyType);
    }, storyItem ? storyItem.getDurationInMs() : 0);
  }

  convertSlideshowsToObjects = slideshowItems => slideshowItems.map(slideshow => this.createMediaType(slideshow, true));

  convertLocalVideoToObjects = localVideoItems => localVideoItems.map(localVideo => this.createMediaType(localVideo, true));

  convertStoryItemsToObjects = story => {
    const storyItemObjects = [];
    storyItemObjects.push(this.convertSlideshowsToObjects(story.slideshows));
    storyItemObjects.push(this.convertLocalVideoToObjects(story.localVideos));
    return storyItemObjects;
  }

  initialiseStory = (story) => {
    var playOrder = this.createPlayOrder(story);
    this.scheduleNextStoryItem(story.storyType, playOrder[0]);
    this.setState({
      playOrder,
      storyConfig: story,
      currentStoryItemIndex: 0,
      mediaToDisplay: playOrder[0],
      playthroughs: 0
    });
  }

  createMediaType = (media, isStory) => {
    if (media.mediaType == "slideshow") {
      return isStory ? new Slideshow(media.slideshowImages, media.random, media.slideshowId, media.playEntireSlideshow, media.duration, media.slideDuration, media.mediaIndex) : new Slideshow(media.slideshowImages, media.random)
    } else {
      return isStory ? new LocalVideo(media.filename, media.playbackSpeed, media.startAtPosition, media.videoDuration, media.id, media.duration, media.playEntireVideo, media.bookmarkVideo, media.mediaIndex) : new LocalVideo(media.filename, media.playbackSpeed, media.startAtPosition, media.videoDuration)
    }
  }

  mediaTypeIsStory = mediaType => mediaType == "story";

  waitForMediaToDisplay = () => {
    console.log("waiting for media")
    fetch("/view/").then(res => res.json()).then(res => {
      res.mediaType != "slideshow" ? this.closeLightbox() : null
      this.clearTimeouts();

      if (!this.mediaTypeIsStory(res.mediaType)) {
        this.setState({ mediaToDisplay: this.createMediaType(res, this.mediaTypeIsStory(res.mediaType)) })
      } else {
        const story = { ...res, slideshows: this.convertSlideshowsToObjects(res.slideshows), localVideos: this.convertLocalVideoToObjects(res.localVideos) };
        this.initialiseStory(story);
      }
    }).then(() => {
      this.waitForMediaToDisplay()
    });
  }

  getMediaToDisplay = () => {
    const { mediaToDisplay, playthroughs, storyConfig } = this.state;
    if (mediaToDisplay.mediaType == 'slideshow') {
      return <SlideshowWrapper
        slideshow={mediaToDisplay.random ? mediaToDisplay.randomise() : mediaToDisplay.slideshowImages}
        openLightbox={this.openLightbox}
        autoplaySpeed={mediaToDisplay.slideDuration}
      />
    } else if (mediaToDisplay.mediaType == "padding") {
      return <div></div>;
    } else if (mediaToDisplay.mediaType == 'localVideo') {
      return <VideoPlayerWrapper video={mediaToDisplay} playthroughs={playthroughs} storyType={storyConfig ? storyConfig.storyType : null} />;
    }
  }

  componentDidMount = () => {
    this.waitForMediaToDisplay();
  }

  render() {
    return (
      <div id="viewer__viewer">
        {this.state.mediaToDisplay ? this.getMediaToDisplay() : null}
        <SlideshowButtons />
      </div>
    );
  }
}

export default Viewer;