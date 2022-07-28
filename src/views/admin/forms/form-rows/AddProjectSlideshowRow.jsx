import React from 'react'
import Dropdown from '../../../../shared-components/Dropdown';


const AddProjectSlideshowRow = (props) => {
  return (
    <div className="project-slideshow-controls__admin">
      <div>
        <Dropdown id={`selected-slideshow-${props.slideshowToAdd.id}`} name="slideshowId" classes="panel-dropdown__admin" type="Slideshow" changeHandler={(e) => props.changeHandler(e, props.slideshowToAdd.id)} dropdownItems={props.slideshows} propToUseAsItemText="name" />
      </div>
      <div>
        <input type="checkbox" id={`random-checkbox-${props.slideshowToAdd.id}`} name="random" value="1" onChange={(e) => props.changeHandler(e, props.slideshowToAdd.id)} />
      </div>
    </div>
  )
}

export default AddProjectSlideshowRow;