import React from 'react';
import Dropdown from '../../../../shared-components/Dropdown';

const LocalVideoRow = (props) => {
  return (
    <div key={props.id} className="medium-col__admin input-container__admin">
      <Dropdown id={`select-video-${props.video.id}`} name="videoId" classes="" type="Local Video" changeHandler={(e) => props.handleInput(e, props.video.id)} dropdownItems={props.videos} propToUseAsItemText="filename" value={props.video.videoId} />
      <input id={`start-at-position-${props.video.id}`} name="startAtPosition" className="number-col__admin" onChange={(e) => props.handleInput(e, props.video.id)} type="number" />
      <input id={`playback-rate-${props.video.id}`} name="playbackRate" className="number-col__admin" onChange={(e) => props.handleInput(e, props.video.id)} type="number" />
    </div>
  )
}

export default LocalVideoRow;