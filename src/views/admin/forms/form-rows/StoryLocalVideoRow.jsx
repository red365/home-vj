import React from 'react';
import Dropdown from '../../../../shared-components/Dropdown';

const StoryLocalVideoRow = props => {
  return (
    <div className="story-item-controls__admin">
      <div className="story-item-media-select__admin">
        <Dropdown id={`select-story-local-video-${props.index}`} name="localVideo" classNames="" type="Local Video" changeHandler={(e) => props.handleTextAndDropdownChange(e, props.index)} dropdownItems={props.localVideos} propToUseAsItemText="filename" />
      </div>
      { props.localVideoValues.localVideoId ? 
      <div className="story-item-controls-container__admin">
        <div>
          <label htmlFor={`video-play-${props.index}`} >Play Entire Video:</label>
          <input type="checkbox" id={`video-play-${props.index}`} name="playEntireVideo" onChange={(e) => props.handleCheckboxChange(e, props.index)} />
        </div>
        <div>
          <label htmlFor={`video-bookmark-${props.index}`} hidden={props.storyType == "scheduled"}>Bookmark:</label>
          <input type="checkbox" id={`video-bookmark-${props.index}`} checked={props.localVideoValues.bookmarkVideo} hidden={props.storyType == "scheduled"} name="bookmarkVideo" onChange={(e) => props.handleCheckboxChange(e, props.index)} />
        </div>
        <div>
          <label htmlFor={`video-duration-${props.index}`} hidden={props.localVideoValues.playEntireVideo}>Duration:</label>
          <input className="number-col__admin" type="number" id={`slideshow-duration-${props.index}`} value={props.localVideoValues.videoDuration} name="videoDuration" hidden={props.localVideoValues.playEntireVideo} onChange={(e) => props.handleTextAndDropdownChange(e, props.index)} />
        </div>
        <div>
          <label htmlFor={`video-start-at-position-${props.index}`} >Start Position:</label>
          <input className="number-col__admin" type="number" id={`slide-duration${props.index}`} name="startAtPosition" value={props.localVideoValues.startAtPosition} onChange={(e) => props.handleTextAndDropdownChange(e, props.index)} />
        </div>
        <div>
          <label htmlFor={`video-play-speed-${props.index}`} >Play Speed:</label>
          <input className="number-col__admin" type="number" id={`slideshow-start-time${props.index}`} name="playbackSpeed"  value={props.localVideoValues["playbackSpeed"]} onChange={(e) => props.handleTextAndDropdownChange(e, props.index)} />
        </div>
      </div>
      : null 
      }
    </div>
  )
}

export default StoryLocalVideoRow;