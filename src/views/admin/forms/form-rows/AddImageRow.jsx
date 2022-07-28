import React from 'react';
import Dropdown from '../../../../shared-components/Dropdown';

const AddImageRow = (props) => {
  return (
    <div className="medium-col__admin input-container__admin">
      <Dropdown id={`select-image-${props.image.id}`} classes="" name="imageId" type="Image" changeHandler={(e) => props.handleInput(e, props.image.id)} dropdownItems={props.imagesToSelectFrom} propToUseAsItemText="filename" />
      <input id={`pos-in-slideshow-${props.image.id}`} name="positionInSlideshow" className="number-col__admin" onChange={(e) => props.handleInput(e, props.image.id)} type="number" />
    </div>
  )
}

export default AddImageRow;