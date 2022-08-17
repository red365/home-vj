import React, { useState, useEffect } from 'react';
import LauncherList from './lists/LauncherList';
import Dropdown from '../../shared-components/Dropdown';
import useAPI from './hooks/useAPI';
import './launcher.css';


const Launcher = props => {
  const [selectedProject, setSelectedProject] = useState();
  const { projects, projectSlideshows, projectLocalVideos, projectStories } = useAPI(selectedProject);

  const launchMedia = (mediaType, id) => {
    fetch(`/launch/project/${selectedProject}/${mediaType}/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mediaType: mediaType, mediaId: id, projectId: selectedProject })
    })
  }

  console.log(projectSlideshows)
  console.log(projectLocalVideos)
  console.log(projectStories)

  return (
    <div className="page-container__common">
      <header className="">
        <h1 className="">Home VJ: Launcher</h1>
        {projects ?
          <div>
            <Dropdown id="selectedProject" classes="header-dropdown__launcher" type="Project" changeHandler={(e) => setSelectedProject(e.target.value)} dropdownItems={projects} propToUseAsItemText="name" />
          </div>
          : <p>There are no projects</p>
        }
      </header>

      {selectedProject ?
        <div>
          <LauncherList heading="Slideshows" items={projectSlideshows} itemType="slideshow" itemPropToUseAsButtonText="name" launch={launchMedia} />
          <LauncherList heading="Local Videos" items={projectLocalVideos} itemType="localVideo" itemPropToUseAsButtonText="filename" launch={launchMedia} />
          <LauncherList heading="Stories" items={projectStories} itemType="story" itemPropToUseAsButtonText="name" launch={launchMedia} />
        </div>
        : null
      }
    </div>
  );
}

export default Launcher;