import React from 'react';
import Form from './Form';
import utils from '../../../utils/utils';

class LocalVideoForm extends Form {
  state = {
    videosToAdd: [
      {
        id: 0,
        videoDescription: "",
        videoFilename: "",
        videoDuration: "",
        startAtPosition: ""
      }
    ]
  }

  lastItemInImageInputArrayContainsInput = () => {
    return this.state.videosToAdd[this.state.videosToAdd.length - 1].videoDescription || this.state.videosToAdd[this.state.videosToAdd.length - 1].videoFilename || this.state.videosToAdd[this.state.videosToAdd.length - 1].videoDuration || this.state.videosToAdd[this.state.videosToAdd.length - 1].startAtPosition;
  }

  spawnNewInputIfNecessary() {
    if (this.lastItemInImageInputArrayContainsInput()) {
      const videosToAdd = this.state.videosToAdd;
      videosToAdd.push({
        id: videosToAdd.length,
        videoDescription: "",
        videoFilename: "",
        videoDuration: "",
        startAtPosition: ""
      });
      this.setState({ videosToAdd: videosToAdd })
    }
  }

  handleVideoInput = (e, indexOfVideoToUpdate) => {
    const videosToAdd = this.state.videosToAdd;
    videosToAdd[indexOfVideoToUpdate][e.target.name] = e.target.value;
    this.setState({ videosToAdd: videosToAdd }, () => this.spawnNewInputIfNecessary());
  }

  filterInvalidVideos = (e) => this.state.videosToAdd.filter(el => el.videoDescription != "" || el.videoFilename != "");

  clearForm = () => {
    this.setState({
      selectedProject: undefined,
      videosToAdd: [
        {
          id: 0,
          videoDescription: "",
          videoFilename: "",
          videoDuration: "",
          startAtPosition: ""
        }
      ]
    })
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const filteredVideos = this.filterInvalidVideos().map(video => {
          const newVideo = { ...video, videoDuration: utils.convertVideoDurationToS(video.videoDuration) };
          return newVideo;
        });
        filteredVideos ?
          this.handleFormSubmit("/admin/create/localVideo/", { localVideosToAdd: filteredVideos })
            .then(res => {
              this.clearForm();
              this.props.onSubmitCallback();
            })
          : null;
      }}>
        <div className="local-video-input-container__admin input-container__admin">
          <label>Description:</label>
          <label>Filename:</label>
          <label className="short-input__admin">Duration (hh:mm:ss):</label>
          <label className="short-input__admin">Play from:</label>
        </div>
        {this.state.videosToAdd.map((video, i) => {
          return (
            <div key={i} className="local-video-input-container__admin input-container__admin">
              <input id={`video-description-${video.id}`} name="videoDescription" value={this.state.videosToAdd[video.id].videoDescription} type="text" onChange={(e) => this.handleVideoInput(e, video.id)} />
              <input id={`video-filename-${video.id}`} type="text" name="videoFilename" value={this.state.videosToAdd[video.id].videoFilename} onChange={(e) => this.handleVideoInput(e, video.id)} />
              <input id={`video-duration-${video.id}`} type="text" name="videoDuration" className="short-input__admin" value={this.state.videosToAdd[video.id].videoDuration} onChange={(e) => this.handleVideoInput(e, video.id)} />
              <input id={`jump-to-start-${video.id}`} type="number" name="startAtPosition" className="short-input__admin" value={this.state.videosToAdd[video.id].startAtPosition} onChange={(e) => this.handleVideoInput(e, video.id)} />
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
}

export default LocalVideoForm;