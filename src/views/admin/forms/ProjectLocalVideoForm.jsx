import React, { useState, useEffect } from 'react';
import useAPI from './form-hooks/useAPI';
import { handleFormSubmit, spawnNewInput } from '../../../utils/sharedFormFunctions';
import { lastItemInArray, moreThanOneSetOfInputsExists } from '../../../utils/utils';
import Dropdown from '../../../shared-components/Dropdown';
import LocalVideoRow from './form-rows/LocalVideoRow';

const ProjectLocalVideoForm = props => {
  const getInitialisedLocalVideo = () => ({
    id: 0,
    videoId: undefined,
    startAtPosition: undefined,
    playbackRate: undefined
  });

  const { projects, localVideos } = useAPI().data;
  const [selectedProject, setProject] = useState(undefined);
  const [localVideosToAdd, setLocalVideosToAdd] = useState([getInitialisedLocalVideo()]);

  useEffect(() => spawnNewInput(localVideosToAdd, lastItemInLocalVideoArrayContainsInput, { ...getInitialisedLocalVideo(), id: localVideosToAdd - length }, setLocalVideosToAdd), [localVideosToAdd]);

  const handleInput = (e, id) => {
    const localVideos = [...localVideosToAdd];
    localVideos[id][e.target.name] = e.target.value;
    setLocalVideosToAdd([...localVideos]);
  }

  const lastItemInLocalVideoArrayContainsInput = () => lastItemInArray(localVideosToAdd).videoId || lastItemInArray(localVideosToAdd).startAtPosition || lastItemInArray(localVideosToAdd).playbackRate;

  const filterInvalidLocalVideos = () => localVideosToAdd.filter(localVideo => localVideo.videoId != undefined);

  const addProjectIdToLocalVideoObject = (filteredLocalVideos) => filteredLocalVideos.map(localVideo => ({ ...localVideo, projectId: selectedProject }));

  const prepDataForSubmit = () => addProjectIdToLocalVideoObject(filterInvalidLocalVideos(), selectedProject);

  const clearFormData = () => {
    setLocalVideosToAdd([getInitialisedLocalVideo()]);
    setProject(undefined);
  }

  const formSubmit = () => {
    e.preventDefault();
    let dataToSubmit = localVideosToAdd.length ? prepDataForSubmit(localVideosToAdd, selectedProject) : null;
    dataToSubmit ? handleFormSubmit("/admin/create/project-media/local-videos", { selectedProject, localVideosToAdd: dataToSubmit }) : null;
    clearFormData();
  }

  return (
    <form onSubmit={(e) => formSubmit()}>
      {projects ?
        <div>
          <div>
            <Dropdown id="selectedProject" classNames="" type="Project" changeHandler={(e) => setProject(e.target.value)} dropdownItems={projects} propToUseAsItemText="name" value={selectedProject} />
          </div>
        </div>
        : <p>Please create a project</p>
      }

      {selectedProject ?
        <div>
          <div className="medium-col__admin input-container__admin">
            <label>Video:</label>
            <label className="number-col__admin">Start Position:</label>
            <label className="number-col__admin">Playback Speed:</label>
          </div>
          <div>
            {localVideosToAdd.map((video, i) => <LocalVideoRow key={i} videos={localVideos} video={video} handleInput={handleInput} />)}
          </div>
          <div>
            <button type="submit" className="panel-btn__admin btn">Submit</button>
          </div>
        </div>
        : null}
    </form>
  )
}

export default ProjectLocalVideoForm;