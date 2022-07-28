import React, { Component } from 'react';
import { convertSToMs } from '../../../utils/utils';

export default class VideoPlayerWrapper extends Component {

    // To jump to position allow time for video DOM node to exist and use currentTime prop
    jumpVideoPlayerToPosition = (startTime, delay=1000) => {

      setTimeout( () => document.getElementById('video-player').currentTime = startTime, delay)
    };

    // can't get playbackrate to apply when set as a prop on the element so use timeout for when element exists
    setVideoPlaybackRate = playbackRate => setTimeout( () => document.getElementById('video-player').playbackRate = playbackRate, 1000);

    configureVideoWrap = () => null;

    videoShouldResume = (storyType, video) => storyType == "routine" && video.bookmarkVideo && video.resumeFrom;

    jumpToResumePosition = video => {
      if (video.videoShouldWrap()) {
        this.jumpVideoPlayerToPosition(0, video.calculateRemainingTimeInS());
      }
      this.jumpVideoPlayerToPosition(video.resumeFrom);
      video.setResumeFrom();
    }

    jumpVideoToPositionAndBookmark = (storyType, video) => storyType == "routine" && video.startAtPosition && video.bookmarkVideo;

    videoHasStartPositionAndShouldBookmark = (video) => null;

    videoShouldBookmark = (storyType, bookmarkVideo) => storyType == "routine" && bookmarkVideo;

    configureVideoSettings = () => {
			const {video, storyType} = this.props;


			if (this.videoShouldResume(storyType, video)) {
        this.jumpToResumePosition(video);
      } else if (this.jumpVideoToPositionAndBookmark(storyType, video)) {
        this.jumpVideoPlayerToPosition(video.startAtPosition);
        video.setResumeFrom();
      } else if (this.videoShouldBookmark(storyType, video.bookmarkVideo)) {
        video.setResumeFrom();
      } else if (video.startAtPosition) {
        this.jumpVideoPlayerToPosition(video.startAtPosition);
      }

      video.playbackRate ? this.setVideoPlaybackRate(video.playbackRate) : null

    }

    videoNeedsSettingsConfigured = (storyType, video) => (storyType == "routine" && video.bookmarkVideo) || video.resumeFrom || video.startAtPosition || video.playbackRate;

    componentDidUpdate = () => this.videoNeedsSettingsConfigured(this.props.storyType, this.props.video) ? this.configureVideoSettings() : null;

    componentDidMount = () => this.videoNeedsSettingsConfigured(this.props.storyType, this.props.video) ? this.configureVideoSettings() : null;
    
    render() {
      return <video id="video-player" className="video-player__viewer" src={`/static/video/${this.props.video.filename}`} autoPlay={true} muted />
    } 
}