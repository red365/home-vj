import React, { useEffect, useState } from 'react';

const useAPI = (selectedProject = undefined) => {
  const [projects, setProjects] = useState(undefined);
  const [projectSlideshows, setProjectSlideshows] = useState(undefined);
  const [projectLocalVideos, setProjectLocalVideos] = useState(undefined);
  const [projectStories, setProjectStories] = useState(undefined);

  useEffect(() => fetch("/get/projects/").then(res => res.json()).then(res => setProjects(res)), []);

  useEffect(() => {
    fetch(`/get/project/${selectedProject}/slideshows/`).then(res => res.json()).then(res => setProjectSlideshows(res));
    fetch(`/get/project/${selectedProject}/video/local/`).then(res => res.json()).then(res => setProjectLocalVideos(res));
    fetch(`/get/project/${selectedProject}/stories/`).then(res => res.json()).then(res => setProjectStories(res));
  }, [selectedProject])

  return { projects, selectedProject, projectSlideshows, projectLocalVideos, projectStories };

}

export default useAPI;