import { randomise, convertSToMs } from "../utils/utils";

// Given in S for consistency with admin inputs
export const defaultSlideshowSlideDuration = 8;

class Slideshow {
  constructor(slideshowImages, random, slideshowId, playEntireSlideshow, duration, slideDuration, mediaIndex) {
    this.mediaType = "slideshow";
    this.mediaIndex = mediaIndex;
    this.playEntireMedia = playEntireSlideshow === 0 ? false : true;
    this.random = random;
    this.id = slideshowId;
    this.duration = duration;
    this.slideDuration = slideDuration || defaultSlideshowSlideDuration;
    this.slideshowImages = slideshowImages;
  }

  getSlideDurationInMs = () => {
    if (this.slideDuration == 3) {
      return convertSToMs(this.slideDuration);
    } else {
      return convertSToMs(this.slideDuration);
    }
  };

  randomise = () => randomise(this.slideshowImages);

  getDurationInMs = () => {
    if (this.playEntireMedia) {
      return convertSToMs(this.slideshowImages.length * this.slideDuration || this.slideshowImages.length * SLIDESHOW_SLIDE_DURATION);
    } else {
      return convertSToMs(this.duration);
    }
  };
}

export default Slideshow;
