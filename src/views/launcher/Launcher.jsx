import React, { Component } from 'react';
import LauncherList from './lists/LauncherList';
import Dropdown from '../../shared-components/Dropdown';
import './launcher.css';


class Launcher extends Component {

  state = {
    projects: undefined,
    selectedProject: undefined
  }

  componentDidMount() {
    fetch("/get/projects/")
    .then(res => res.json()).then(res => {
      this.setState({ projects: res })
    });
  }

  launchMedia = ( mediaType, id ) => {
    fetch(`/launch/project/${this.state.selectedProject}/${mediaType}/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( { mediaType: mediaType, mediaId: id, projectId: this.state.selectedProject } )
    })
  }

  componentDidUpdate = () => {
    const {selectedProject, slideshows, localVideos} = this.state;
    if (selectedProject && !slideshows && !localVideos) {
      
      fetch(`/get/project/${selectedProject}/slideshows/`)
      .then(res => res.json()).then(res => {
        this.setState({ slideshows: res })
      });

      fetch(`/get/project/${selectedProject}/video/local/`)
      .then(res => res.json()).then(res => {
        this.setState({ localVideos: res })
      });

      fetch(`/get/project/${selectedProject}/stories/`)
      .then(res => res.json()).then(res => {
        this.setState({ stories: res })
      });
    }

  }

  render() {

    return (
      <div className="page-container__common">
        <header className="">
          <h1 className="">Home VJ: Launcher</h1>
          { this.state.projects ?
          <div>
            <Dropdown id="selectedProject" classes="header-dropdown__launcher" type="Project" changeHandler={(e) => this.setState({ selectedProject: e.target.value, stories: undefined, slideshows: undefined, localVideos: undefined })} dropdownItems={this.state.projects} propToUseAsItemText="name" />
          </div>
          : <p>There are no projects</p>
        }
        </header>

        { this.state.selectedProject ?
          <div>
            <LauncherList heading="Slideshows" items={this.state.slideshows} itemType="slideshow" itemPropToUseAsButtonText="name" launch={this.launchMedia} />
            <LauncherList heading="Local Videos" items={this.state.localVideos} itemType="localVideo" itemPropToUseAsButtonText="filename" launch={this.launchMedia} />
            <LauncherList heading="Stories" items={this.state.stories} itemType="story" itemPropToUseAsButtonText="name" launch={this.launchMedia} />
          </div>
          : null
        }
      </div>
    );
  }
}

export default Launcher;