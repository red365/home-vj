import React, { useState, useEffect } from 'react';
import useAPI from './form-hooks/useAPI';
import { handleInput, handleFormSubmit, spawnNewInput } from '../../../utils/sharedFormFunctions';
import { lastItemInArray } from '../../../utils/utils';
import ProjectSlideshowRow from './form-rows/ProjectSlideshowRow';
import Dropdown from '../../../shared-components/Dropdown';

const ProjectSlideshowForm = props => {
  const getInitialisedSlideshow = () => ({ id: 0, slideshowId: undefined, random: false })
  const { projects, slideshows } = useAPI().data;
  const [slideshowsToAdd, setSlideshows] = useState([getInitialisedSlideshow()])
  const [selectedProject, setProject] = useState(undefined);

  useEffect(() => spawnNewInput(slideshowsToAdd, lastItemInSlideshowInputArrayContainsInput, { ...getInitialisedSlideshow(), id: slideshowsToAdd.lemgth }, setSlideshows), [slideshowsToAdd]);

  const handleCheckboxChange = (index) => {
    const slideshows = [...slideshowsToAdd];
    slideshows[index].random = slideshowsToAdd[index].random ? false : true;
    setSlideshows([...slideshows]);
  }

  const handleSlideshowSelect = (e, id) => {
    const slideshows = [...slideshowsToAdd];
    slideshows[id][e.target.name] = e.target.value;
    setSlideshows([...slideshows]);
  }

  const lastItemInSlideshowInputArrayContainsInput = () => lastItemInArray(slideshowsToAdd).slideshowId || lastItemInArray(slideshowsToAdd).random;

  const filterInvalidSlideshows = () => slideshowsToAdd.filter(slideshow => slideshow.slideshowId != undefined);

  const addProjectIdToSlideshowObject = (slideshows) => slideshows.map(slideshow => ({ ...slideshow, projectId: selectedProject }));

  const prepDataForSubmit = () => slideshowsToAdd[0].slideshowId ? addProjectIdToSlideshowObject(filterInvalidSlideshows(), selectedProject) : [];

  const clearFormData = () => {
    setProject(undefined);
    setSlideshows([getInitialisedSlideshow]);
  };

  const formSubmit = e => {
    e.preventDefault();
    let dataToSubmit = prepDataForSubmit(slideshowsToAdd, selectedProject);
    dataToSubmit ? handleFormSubmit("/admin/create/project-media/slideshows", { slideshowsToAdd: dataToSubmit }) : null;
    clearFormData();
  }

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div>
        {projects ?
          <div>
            <div>
              <Dropdown id="selectedProject" name="selectedProject" classes="panel-dropdown__admin" type="Project" changeHandler={(e) => setProject(e.target.value)} dropdownItems={projects} propToUseAsItemText="name" value={selectedProject} />
            </div>
          </div>
          : <h3>There are no projects.</h3>
        }
        {selectedProject ?
          <div>
            <div className="medium-col__admin input-container__admin">
              <label>Slideshow:</label>
              <label className="number-col__admin">Random?:</label>
            </div>
            {slideshowsToAdd.map((slideshowToAdd, i) => <ProjectSlideshowRow key={i} id={i} slideshows={slideshows} slideshowToAdd={slideshowToAdd} handleSlideshowSelect={handleSlideshowSelect} handleCheckboxChange={handleCheckboxChange} slideshowId={slideshowToAdd.slideshowId} random={slideshowToAdd.projectSlideshowProps} />)}
          </div>
          : null
        }
        <div>
          <button type="submit" className="panel-btn__admin btn">Submit</button>
        </div>
      </div>
    </form>
  )
}

export default ProjectSlideshowForm;