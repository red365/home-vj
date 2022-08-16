import React, { useMemo } from 'react';
import Dropdown from '../../../../shared-components/Dropdown';

const StoryLocalVideoRow = props => {
  const { index, storyType, handleCheckboxChange, handleTextAndDropdownChange, localVideoValues, localVideos } = props;
  const { localVideoId, bookmarkVideo, playEntireVideo, videoDuration, startAtPosition } = localVideoValues;
  return (
    <div className="story-item-controls__admin">
      <div className="story-item-media-select__admin">
        <Dropdown id={`select-story-local-video-${index}`} name="localVideo" classNames="" type="Local Video" changeHandler={(e) => handleTextAndDropdownChange(e, index)} dropdownItems={localVideos} propToUseAsItemText="filename" />
      </div>
      {localVideoId ?
        <div className="story-item-controls-container__admin">
          <div>
            <label htmlFor={`video-play-${index}`} >Play Entire Video:</label>
            <input type="checkbox" id={`video-play-${index}`} checked={playEntireVideo} name="playEntireVideo" onChange={(e) => handleCheckboxChange(e, index)} />
          </div>
          <div>
            <label htmlFor={`video-bookmark-${index}`} hidden={storyType == "scheduled"}>Bookmark:</label>
            <input type="checkbox" id={`video-bookmark-${index}`} checked={bookmarkVideo} hidden={storyType == "scheduled"} name="bookmarkVideo" onChange={(e) => handleCheckboxChange(e, index)} />
          </div>
          <div>
            <label htmlFor={`video-duration-${index}`} hidden={playEntireVideo}>Duration:</label>
            <input className="number-col__admin" type="number" id={`slideshow-duration-${index}`} value={videoDuration} name="videoDuration" hidden={playEntireVideo} onChange={(e) => handleTextAndDropdownChange(e, index)} />
          </div>
          <div>
            <label htmlFor={`video-start-at-position-${index}`} >Start Position:</label>
            <input className="number-col__admin" type="number" id={`slide-duration${index}`} name="startAtPosition" value={startAtPosition} onChange={(e) => handleTextAndDropdownChange(e, index)} />
          </div>
          <div>
            <label htmlFor={`video-play-speed-${index}`} >Play Speed:</label>
            <input className="number-col__admin" type="number" id={`slideshow-start-time${index}`} name="playbackSpeed" value={localVideoValues["playbackSpeed"]} onChange={(e) => handleTextAndDropdownChange(e, index)} />
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default StoryLocalVideoRow;