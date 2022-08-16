import React, { useState, useEffect, createContext } from 'react';

export const APIContext = createContext();

const APIContextProvider = ({ children }) => {

  const getFormData = (url, callback) => fetch(url).then(res => res.json()).then(res => callback(res));
  const getProjects = () => getFormData("/get/projects/", (res) => updateApiData("projects", { projects: res }));
  const getImages = () => getFormData("/admin/get/images/", (res) => updateApiData("images", { images: res }));
  const getSlideshows = () => getFormData("/slideshow/all/", (res) => updateApiData("slideshows", { slideshows: res }));
  const getStories = () => getFormData("/admin/get/stories/", (res) => updateApiData("stories", { stories: res }))
  const getLocalVideos = () => getFormData("/admin/get/localVideo/", (res) => updateApiData("localVideos", { localVideos: res }))

  const getAPIData = () => {
    getProjects();
    getImages();
    getSlideshows();
    getStories();
    getLocalVideos();
  }



  const [data, setData] = useState({});

  const updateApiData = (dataType, dataToStore) => {
    data[dataType] = dataToStore[dataType];

    setData({ ...data });
  }

  useEffect(() => getAPIData(), [])

  return <APIContext.Provider value={{ data, getProjects, getImages, getSlideshows, getStories, getLocalVideos }} >{children}</APIContext.Provider>
}

export default APIContextProvider;