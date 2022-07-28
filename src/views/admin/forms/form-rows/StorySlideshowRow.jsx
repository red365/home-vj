import React from 'react';
import Dropdown from '../../../../shared-components/Dropdown';

const StorySlideshowRow = props => {
  const {index, slideshows, handleCheckboxChange, handleTextAndDropdownChang } = props;
  const {slideshowId, random, playEntireSlideshow, slideshowDuration, slideDuration} = props.slideshowValues;

  return (
    <div className="story-item-controls__admin">
      <div className="story-item-media-select__admin">
        <Dropdown id={`select-story-slideshow-${index}`} name="slideshow" className="" type="Slideshow" changeHandler={(e) => props.handleTextAndDropdownChange(e, index)} dropdownItems={slideshows} propToUseAsItemText="name" />
      </div>
      { slideshowId ? 
      <div className="story-item-controls-container__admin">
        <div>
          <label htmlFor={`slideshow-random-${index}`} >Random?:</label>
          <input type="checkbox" id={`slideshow-random-${index}`} name="random" onChange={(e) => props.handleCheckboxChange(e, index)} />
        </div>
        <div>
          <label htmlFor={`slideshow-play-${props.index}`} >Play Entire Slideshow:</label>
          <input type="checkbox" id={`slideshow-play-${props.index}`} name="playEntireSlideshow" onChange={(e) => props.handleCheckboxChange(e, props.index)} />
        </div>
        <div>
          <label htmlFor={`slideshow-play-${props.index}`} hidden={props.slideshowValues.playEntireSlideshow} >Slideshow Duration:</label>
          <input className="number-col__admin" type="number" id={`slideshow-duration-${props.index}`} name="slideshowDuration" value={props.slideshowValues["slideshowDuration"]} onChange={(e) => props.handleTextAndDropdownChange(e, props.index)} hidden={props.slideshowValues.playEntireSlideshow} />
        </div>
        <div>
          <label htmlFor={`slide-duration-${props.index}`} >Slide Duration:</label>
          <input className="number-col__admin" type="number" name="slideDuration" id={`slide-duration-${props.index}`} value={props.slideshowValues["slideDuration"]} onChange={(e) => props.handleTextAndDropdownChange(e, props.index)} />
        </div>
        </div>
      : null }
    </div>
  )
}

export default StorySlideshowRow;