import React, { useState, useEffect } from 'react';
import useAPI from './form-hooks/useAPI';
import { handleFormSubmit, spawnNewInput } from '../../../utils/sharedFormFunctions';
import { lastItemInArray } from '../../../utils/utils';
import Dropdown from '../../../shared-components/Dropdown';
import ImageRow from './form-rows/ImageRow';

const SlideshowImagesForm = props => {
  const getInitialisedImage = () => ({ id: 0, imageId: undefined, positionInSlideshow: undefined })

  const [selectedSlideshow, setSlideshow] = useState(undefined);
  const [imagesToAdd, setImagesToAdd] = useState([getInitialisedImage()]);

  const { slideshows, images } = useAPI().data;

  useEffect(() => spawnNewInput(imagesToAdd, lastItemInImageInputArrayContainsInput, { ...getInitialisedImage(), id: imagesToAdd.length }, setImagesToAdd), [imagesToAdd]);

  const handleSlideshowSelection = e => setSlideshow(e.target.value);

  const handleInput = (e, id) => {
    const images = [...imagesToAdd];
    images[id][e.target.name] = e.target.value;
    setImagesToAdd(images);
  }

  const lastItemInImageInputArrayContainsInput = () => lastItemInArray(imagesToAdd).imageId || lastItemInArray(imagesToAdd).positionInSlideshow;

  const filterInvalidImages = () => imagesToAdd.filter(el => el.imageId != undefined);

  const clearFormData = () => {
    setSlideshow(undefined);
    setImagesToAdd([getInitialisedImage()]);
  }

  const formSubmit = e => {
    e.preventDefault();
    const filteredImagesToAdd = filterInvalidImages();
    filteredImagesToAdd ? handleFormSubmit("/admin/create/slideshowImages/", { imagesToAddToSlideshow: filteredImagesToAdd, selectedSlideshow }) : null;
    clearFormData();
  }

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      {slideshows ?
        <div>
          <div>
            <Dropdown id="slideshow" classNames="" type="Slideshow" changeHandler={(e) => handleSlideshowSelection(e)} dropdownItems={slideshows} propToUseAsItemText="name" value={selectedSlideshow} />
          </div>
        </div>
        : <p>Please add a slideshow</p>
      }
      {selectedSlideshow ?
        <div>
          <div className="medium-col__admin input-container__admin">
            <label>Image description:</label>
            <label className="number-col__admin">Slide number:</label>
          </div>
          {imagesToAdd.map((image, i) => <ImageRow key={i} id={i} handleInput={handleInput} image={image} imagesToSelectFrom={images} />)}
          <div>
            <button type="submit" className="panel-btn__admin btn">Submit</button>
          </div>
        </div>
        : null}
    </form>
  )
}

export default SlideshowImagesForm;