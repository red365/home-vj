import React, { Component } from 'react';

function ImageInput(props) {
    return (
      <div className="image-input-container__admin input-container__admin">
        <input id={`image-description-${props.inputData.id}`} type="text" onChange={(e) => props.callback(e.target.value, props.inputData.id, 'descriptionValue') } value={props.inputData.descriptionValue} />
        <input id={`image-filename-${props.inputData.id}`} type="text" onChange={(e) => props.callback(e.target.value, props.inputData.id, 'filenameValue') } value={props.inputData.filenameValue} />
      </div>
    )
}

export default ImageInput;