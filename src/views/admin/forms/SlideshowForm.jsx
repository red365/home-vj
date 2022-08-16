import React, { useState } from 'react';
import { handleFormSubmit } from '../../../utils/sharedFormFunctions';
import useAPI from './form-hooks/useAPI';

const SlideshowForm = props => {
  const { getSlideshows } = useAPI();
  const [slideshowName, setSlideshowName] = useState("");

  const clearFormData = () => setSlideshowName("");

  const formSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit("/admin/create/slideshow/", { slideshowName })
      .then(res => {
        clearFormData();
        getSlideshows();
      });
  }

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div>
        <div className="medium-col__admin input-container__admin">
          <label htmlFor="slideshowName" >Slideshow Name:</label>
        </div>
        <div className="medium-col__admin input-container__admin">
          <input id="slideshowName" name="slideshowName" type="text" value={slideshowName} onChange={(e) => setSlideshowName(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="panel-btn__admin btn">Submit</button>
        </div>

      </div>
    </form>
  )
}

export default SlideshowForm;