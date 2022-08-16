import React, { useMemo } from 'react';
import Dropdown from '../../../../shared-components/Dropdown';

const StorySlideshowRow = props => {
  const { index, slideshows, handleCheckboxChange, handleTextAndDropdownChange } = props;
  const { slideshowId, random, playEntireSlideshow, slideshowDuration, slideDuration } = props.slideshowValues;

  return (
    <div className="story-item-controls__admin">
      <div className="story-item-media-select__admin">
        <Dropdown id={`select-story-slideshow-${index}`} name="slideshow" className="" type="Slideshow" changeHandler={(e) => handleTextAndDropdownChange(e, index)} dropdownItems={slideshows} propToUseAsItemText="name" value={slideshowId} />
      </div>
      {slideshowId ?
        <div className="story-item-controls-container__admin">
          <div>
            <label htmlFor={`slideshow-random-${index}`} >Random?:</label>
            <input type="checkbox" id={`slideshow-random-${index}`} name="random" onChange={(e) => handleCheckboxChange(e, index)} value={random} />
          </div>
          <div>
            <label htmlFor={`slideshow-play-${index}`} >Play Entire Slideshow:</label>
            <input type="checkbox" id={`slideshow-play-${index}`} name="playEntireSlideshow" onChange={(e) => handleCheckboxChange(e, index)} value={playEntireSlideshow} />
          </div>
          <div>
            <label htmlFor={`slideshow-play-${index}`} hidden={playEntireSlideshow} >Slideshow Duration:</label>
            <input className="number-col__admin" type="number" id={`slideshow-duration-${index}`} name="slideshowDuration" value={slideshowDuration} onChange={(e) => handleTextAndDropdownChange(e, index)} hidden={playEntireSlideshow} />
          </div>
          <div>
            <label htmlFor={`slide-duration-${index}`} >Slide Duration:</label>
            <input className="number-col__admin" type="number" name="slideDuration" id={`slide-duration-${index}`} value={slideDuration} onChange={(e) => handleTextAndDropdownChange(e, index)} />
          </div>
        </div>
        : null}
    </div>
  )
}

export default StorySlideshowRow;