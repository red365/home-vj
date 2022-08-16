import React from 'react'
import Dropdown from '../../../../shared-components/Dropdown';


const ProjectSlideshowRow = (props) => {
  return (
    <div key={props.id} className="project-slideshow-controls__admin">
      <div>
        <Dropdown id={`selected-slideshow-${props.slideshowToAdd.id}`} name="slideshowId" classes="panel-dropdown__admin" type="Slideshow" changeHandler={(e) => props.handleSlideshowSelect(e, props.id)} dropdownItems={props.slideshows} propToUseAsItemText="name" value={props.slideshowId} />
      </div>
      <div>
        <input type="checkbox" id={`random-checkbox-${props.slideshowToAdd.id}`} name="random" value={props.random} onChange={(e) => props.handleCheckboxChange(props.id)} />
      </div>
    </div>
  )
}

export default ProjectSlideshowRow;