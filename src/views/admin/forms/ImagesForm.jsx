import React, { useState, useEffect, useMemo } from 'react';
import useAPI from './form-hooks/useAPI';
import { spawnNewInput } from '../../../utils/sharedFormFunctions';
import { handleFormSubmit } from '../../../utils/sharedFormFunctions';
import ImageInput from './form-inputs/ImageInput';

const ImagesForm = props => {
  const getInitialisedImage = () => ({ id: 0, descriptionValue: "", filenameValue: "" });
  const { getImages } = useAPI();
  const [imagesToAdd, setImagesToAdd] = useState([getInitialisedImage()])

  useEffect(() => spawnNewInput(imagesToAdd, lastItemInImageInputArrayContainsInput, { ...getInitialisedImage(), id: imagesToAdd.length }, setImagesToAdd), [imagesToAdd]);

  const handleInput = (e, id) => {
    imagesToAdd[id][e.target.name] = e.target.value;
    setImagesToAdd([...imagesToAdd]);
  }

  const clearFormData = () => {
    setImagesToAdd([getInitialisedImage()]);
  }

  const filterImagesToAdd = () => imagesToAdd.filter(image => image.descriptionValue != "" && image.filenameValue != "");

  const lastItemInImageInputArrayContainsInput = () => imagesToAdd[imagesToAdd.length - 1].descriptionValue || imagesToAdd[imagesToAdd.length - 1].filenameValue;

  const formSubmit = e => {
    e.preventDefault();
    let filteredImagesToAdd = filterImagesToAdd();
    filteredImagesToAdd ?
      handleFormSubmit("/admin/create/images/", { filteredImagesToAdd })
        .then(res => {
          clearFormData();
          getImages();
        })
      : null;
  }

  console.log("rendering ImagesForm");

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div className="image-input-container__admin input-container__admin ">
        <label>Description:</label>
        <label>Filename:</label>
      </div>
      {imagesToAdd.map((inputData, i) => <ImageInput key={i} inputData={inputData} callback={handleInput} />)}
      <button type="submit" className="panel-btn__admin btn" >Submit</button>
    </form>
  )
}

export default ImagesForm;