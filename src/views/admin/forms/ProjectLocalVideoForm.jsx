import React from 'react';
import Form from './Form';
import Dropdown from '../../../shared-components/Dropdown';
import AddVideoRow from './form-rows/AddVideoRow';

class ProjectLocalVideoForm extends Form {
  state = {
    selectedProject: undefined,
    localVideosToAdd: [
      {
        id: 0,
        videoId: undefined,
        startAtPosition: undefined,
        playbackRate: undefined
      }
    ]
  }

  handleVideoSelect = (e, idOfVideoToChange) => {
    const localVideosToAdd = this.state.localVideosToAdd;
    localVideosToAdd[idOfVideoToChange][e.target.name] = e.target.value;
    this.setState({ localVideosToAdd: localVideosToAdd }, () => this.spawnNewInputIfNecessary(this.state.videosToAdd));
  }

  lastItemInLocalVideoArrayContainsInput = localVideosToAdd => this.lastItemInArray(localVideosToAdd).videoId || this.lastItemInArray(localVideosToAdd).startAtPosition || this.lastItemInArray(localVideosToAdd).playbackRate;

  spawnNewInputIfNecessary() {
    if (this.lastItemInLocalVideoArrayContainsInput(this.state.localVideosToAdd)) {
      const localVideosToAdd = this.state.localVideosToAdd;
      localVideosToAdd.push({ id: localVideosToAdd.length, videoId: undefined, startAtPosition: '', playbackRate: '' });
      this.setState({ localVideosToAdd: localVideosToAdd });
    }
  }

  filterInvalidLocalVideos = (localVideosToAdd) => localVideosToAdd.filter(el => el.videoId != undefined);

  addProjectIdToLocalVideoObject = (localVideosToAdd, selectedProject) => localVideosToAdd.map(localVideo => ({ ...localVideo, projectId: selectedProject }));

  prepDataForSubmit = (localVideosToAdd, selectedProject) => this.addProjectIdToLocalVideoObject(this.filterInvalidLocalVideos(localVideosToAdd), selectedProject);

  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const { localVideosToAdd, selectedProject } = this.state;
        let dataToSubmit = localVideosToAdd.length ? this.prepDataForSubmit(localVideosToAdd, selectedProject) : null;
        dataToSubmit ? this.handleFormSubmit("/admin/create/project-media/local-videos", { selectedProject, localVideosToAdd: dataToSubmit }) : null;
        this.setState({ selectedProject: undefined, localVideosToAdd: [{ id: 0, videoId: undefined, random: false }] });
      }
      }>

        {this.props.projects ?
          <div>
            <div>
              <Dropdown id="selectedProject" classNames="" type="Project" changeHandler={(e) => this.handleInput(e)} dropdownItems={this.props.projects} propToUseAsItemText="name" />
            </div>
          </div>
          : <p>Please create a project</p>
        }

        {this.state.selectedProject ?
          <div>
            <div className="medium-col__admin input-container__admin">
              <label>Video:</label>
              <label className="number-col__admin">Start Position:</label>
              <label className="number-col__admin">Playback Speed:</label>
            </div>
            <div>
              {this.state.localVideosToAdd.map((video, i) => <AddVideoRow key={i} videos={this.props.localVideos} video={video} handleInput={this.handleVideoSelect} />)}
            </div>
            <div>
              <button type="submit" className="panel-btn__admin btn">Submit</button>
            </div>
          </div>
          : null}
      </form>
    )
  }
}

export default ProjectLocalVideoForm;