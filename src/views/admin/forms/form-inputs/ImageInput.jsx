import React, { useContext } from 'react';


function ImageInput(props) {
  return (
    <div className="image-input-container__admin input-container__admin">
      <input id={`image-description-${props.inputData.id}`} name="descriptionValue" type="text" onChange={(e) => props.callback(e, props.inputData.id)} value={props.inputData.descriptionValue} />
      <input id={`image-filename-${props.inputData.id}`} name="filenameValue" type="text" onChange={(e) => props.callback(e, props.inputData.id, 'filenameValue')} value={props.inputData.filenameValue} />
    </div>
  )
}

export default ImageInput;