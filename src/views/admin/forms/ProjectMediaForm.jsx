import React from 'react';
import Form from './Form';
import Dropdown from '../../../shared-components/Dropdown';

class ProjectMediaForm extends Form {
    state = {
      selectedProject: undefined,
      selectedLocalVideo: undefined,
      startAtPosition: "",
    }
  
    render() {
      
      return (
        <form onSubmit={(e) => {
          this.state.selectedSlideshow ? this.handleFormSubmit(e, "/admin/create/project-media/slideshows", { selectedSlideshow: this.state.selectedSlideshow, selectedProject: this.state.selectedProject, random: this.state.random }) : null
          this.state.selectedLocalVideo ? this.handleFormSubmit(e, "/admin/create/project-media/local-videos", { selectedProject: this.state.selectedProject, selectedLocalVideo: this.state.selectedLocalVideo, startAtPosition: this.state.startAtPosition  }) : null
          this.setState({ ...this.state, selectedProject: undefined, selectedSlideshow: undefined, random: 0, localVideo: undefined, startAtPosition: "" });
        }
        }>
  
          { this.state.projects ? 
            <div>
              <label htmlFor="selectedProject" >Select a project to add media:</label>
              <div>
                <Dropdown id="selectedProject" classNames="" type="Project" changeHandler={(e) => this.handleInput(e)} dropdownItems={this.state.projects} propToUseAsItemText="name" />
              </div>
            </div>
            : <h3>There are no projects. Please create one in order to add media to it</h3>
          }

          { this.state.selectedProject ? 
              <div>
                <div>
                  <label htmlFor="selectedSlideshow" >Select a slideshow:</label>
                  <Dropdown id="selectedSlideshow" classNames="" type="Slideshow" changeHandler={(e) => this.handleInput(e)} dropdownItems={this.state.slideshows} propToUseAsItemText="name"/>
                </div>
                <div>
                  <input type="checkbox" id="random" name="random" value="1" onChange={(e) =>  this.handleCheckboxChange(e)} />
                  <label htmlFor="random">Random?</label><br />
                 </div>

                <div>
                 <label htmlFor="selectedLocalVideo" >Select a video:</label>
                 <Dropdown id="selectedLocalVideo" classNames="" type="Video" changeHandler={(e) => this.handleInput(e)} dropdownItems={this.state.localVideos} propToUseAsItemText="filename"/>
                </div>

                <div>
                 <label htmlFor="startAtPosition" >Jump to start (in seconds):</label>
                 <input type="text" id="startAtPosition" value={this.state.startAtPosition} onChange={(e) => this.handleInput(e)} dropdownItems={this.state.slideshows}/>
                </div>

      
                <button type="submit">Submit</button>
              </div>
              : null
          }
        </form>
      )
    }
}

export default ProjectMediaForm;