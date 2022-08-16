import React, { useState, useEffect } from 'react';
import useAPI from './form-hooks/useAPI';
import { spawnNewInput } from '../../../utils/sharedFormFunctions';
import { handleFormSubmit } from '../../../utils/sharedFormFunctions';
import utils from '../../../utils/utils';

const LocalVideoForm = props => {
  const getInitialisedLocalVideo = () => ({ id: 0, videoDescription: "", videoFilename: "", videoDuration: "", startAtPosition: "" });
  const { getLocalVideos } = useAPI();
  const [localVideosToAdd, setLocalVideosToAdd] = useState([getInitialisedLocalVideo()]);

  useEffect(() => spawnNewInput(localVideosToAdd, lastItemInLocalVideoArrayContainsInput, { ...getInitialisedLocalVideo(), id: localVideosToAdd.length }, setLocalVideosToAdd), [localVideosToAdd]);

  const handleVideoInput = (e, indexOfVideoToUpdate) => {
    localVideosToAdd[indexOfVideoToUpdate][e.target.name] = e.target.value;
    setLocalVideosToAdd([...localVideosToAdd]);
  }

  const lastItemInLocalVideoArrayContainsInput = () => {
    return localVideosToAdd[localVideosToAdd.length - 1].videoDescription || localVideosToAdd[localVideosToAdd.length - 1].videoFilename || localVideosToAdd[localVideosToAdd.length - 1].videoDuration || localVideosToAdd[localVideosToAdd.length - 1].startAtPosition;
  }

  const filterInvalidVideos = (e) => localVideosToAdd.filter(el => el.videoDescription != "" || el.videoFilename != "");

  const clearForm = () => setLocalVideosToAdd([getInitialisedLocalVideo()]);

  const formSubmit = (e) => {
    e.preventDefault();
    const filteredVideos = filterInvalidVideos().map(video => {
      return { ...video, videoDuration: utils.convertVideoDurationToS(video.videoDuration) };
    });
    filteredVideos ?
      handleFormSubmit("/admin/create/localVideo/", { localVideosToAdd: filteredVideos })
        .then(res => {
          clearForm();
          getLocalVideos();
        })
      : null;
  }

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div className="local-video-input-container__admin input-container__admin">
        <label>Description:</label>
        <label>Filename:</label>
        <label className="short-input__admin">Duration (hh:mm:ss):</label>
        <label className="short-input__admin">Play from:</label>
      </div>
      {localVideosToAdd.map((video, i) => {
        return (
          <div key={i} className="local-video-input-container__admin input-container__admin">
            <input id={`video-description-${video.id}`} name="videoDescription" value={localVideosToAdd[video.id].videoDescription} type="text" onChange={(e) => handleVideoInput(e, video.id)} />
            <input id={`video-filename-${video.id}`} type="text" name="videoFilename" value={localVideosToAdd[video.id].videoFilename} onChange={(e) => handleVideoInput(e, video.id)} />
            <input id={`video-duration-${video.id}`} type="text" name="videoDuration" className="short-input__admin" value={localVideosToAdd[video.id].videoDuration} onChange={(e) => handleVideoInput(e, video.id)} />
            <input id={`jump-to-start-${video.id}`} type="number" name="startAtPosition" className="short-input__admin" value={localVideosToAdd[video.id].startAtPosition} onChange={(e) => handleVideoInput(e, video.id)} />
          </div>
        )
      })
      }
      <div>
        <button type="submit" className="panel-btn__admin btn">Submit</button>
      </div>
    </form>
  )
}





export default LocalVideoForm;