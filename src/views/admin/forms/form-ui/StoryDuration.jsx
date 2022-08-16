import React from 'react';
import { defaultSlideshowSlideDuration } from '../../../../media-types/Slideshow';

export const getVideoDuration = (id, localVideos) => {
  return localVideos.find(lv => parseInt(lv.id) == parseInt(id)).videoDuration;
};

export const StoryDuration = props => {
  const { mediaItems, storyDuration, slideshows, localVideos, getNumberOfSlideshowSlides } = props;

  const reduceStoryItemDuration = (total, item) => {
    const { playEntireSlideshow, slideshow } = item;
    const slideDuration = parseInt(item.slideDuration);
    const slideshowDuration = parseInt(item.slideshowDuration);
    let itemDuration = undefined;

    if (item.mediaType == "slideshow") {
      if (!slideshowDuration || playEntireSlideshow) {
        itemDuration = (slideDuration || defaultSlideshowSlideDuration) * getNumberOfSlideshowSlides(item.slideshowId, slideshows);
      } else {
        itemDuration = slideshowDuration;
      }
    } else {
      itemDuration = item.localVideoId ? calculateVideoStoryItemDuration(item) : 0;
    }

    total += parseInt(itemDuration);
    return total;
  }

  const calculateDurationBasedOnPlaybackSpeed = (duration, playbackSpeed) => {
    var durationBasedOnPlaybackSpeed;
    try {
      durationBasedOnPlaybackSpeed = Math.floor(duration / playbackSpeed)
    } catch (err) {
      durationBasedOnPlaybackSpeed = 0;
    }
    return durationBasedOnPlaybackSpeed;
  }

  const calculateVideoStoryItemDuration = (item) => {
    const { playbackSpeed, localVideo, playEntireVideo, videoDuration } = item;
    const entireVideoDurationInS = getVideoDuration(item.localVideoId, localVideos);
    const startAtPosition = item.startAtPosition ? item.startAtPosition : 0;
    let duration = undefined
    if (playEntireVideo && startAtPosition) {
      duration = entireVideoDurationInS - startAtPosition;
    } else if (videoDuration) {
      duration = videoDuration;
    } else if (!playEntireVideo) {
      duration = 0;
    } else {
      duration = entireVideoDurationInS;
    }

    if (playbackSpeed) {
      duration = calculateDurationBasedOnPlaybackSpeed(duration, playbackSpeed)
    }

    return duration;
  }

  const getStoryTimeLeftToFillInS = () => {
    const reducedTotal = mediaItems.filter(item => item.mediaType != undefined).reduce(reduceStoryItemDuration, 0);
    return storyDuration - reducedTotal;
  }
  const storyTimeRemaining = getStoryTimeLeftToFillInS();

  return <label>Time left to fill: {storyTimeRemaining ? storyTimeRemaining : null}</label>
}

export default StoryDuration;