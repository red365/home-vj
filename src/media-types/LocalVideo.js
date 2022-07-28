import { convertSToMs } from "../utils/utils";

class LocalVideo {
  constructor(filename, playbackRate, startAtPosition, videoDuration, id, duration, playEntireVideo, bookmarkVideo, mediaIndex) {
    this.id = id;
    this.mediaType = "localVideo";
    this.startAtPosition = startAtPosition;
    this.playEntireMedia = playEntireVideo === 0 ? false : true;
    this.duration = duration;
    this.playbackRate = playbackRate;
    this.filename = filename;
    this.videoDuration = videoDuration;
    this.bookmarkVideo = bookmarkVideo === 0 ? false : true;
    this.mediaIndex = mediaIndex;
    this.resumeFrom = undefined;
  }

  videoShouldWrap = () => {
    if (this.resumeFrom) {
      return this.videoDuration - this.resumeFrom < this.duration;
    } else {
      return this.videoDuration - this.startAtPosition < this.duration;
    }
  };

  setResumeFrom = () => {
    let resumeFrom = undefined;
    if (this.resumeFrom && this.videoShouldWrap()) {
      resumeFrom = this.duration - this.calculateRemainingTimeInS();
    } else if (this.resumeFrom && !this.videoShouldWrap()) {
      resumeFrom = this.resumeFrom + this.duration;
    } else if (this.startAtPosition) {
      resumeFrom = this.startAtPosition + this.duration;
    } else {
      resumeFrom = this.duration;
    }
    this.resumeFrom = resumeFrom;
  };

  calculateRemainingTimeInS = () => {
    if (this.resumeFrom) {
      return this.videoDuration - this.resumeFrom;
    } else {
      return this.videoDuration - this.startAtPosition;
    }
  };

  getDurationInMs = () => {
    if (this.playEntireMedia) {
      return convertSToMs(this.videoDuration);
    } else {
      return convertSToMs(this.duration);
    }
  };

  calculateVideoPosition = (duration, playthroughs) => duration * playthroughs;
}

export default LocalVideo;
