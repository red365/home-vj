import React, { Component } from 'react';
import './admin.css';
import ProjectForm from './forms/ProjectForm';
import SlideshowForm from './forms/SlideshowForm';
import ImagesForm from './forms/ImagesForm';
import SlideshowImagesForm from './forms/SlideshowImagesForm';
import LocalVideoForm from './forms/LocalVideoForm';
import StoryForm from './forms/StoryForm';
import ProjectLocalVideoForm from './forms/ProjectLocalVideoForm';
import ProjectSlideshowForm from './forms/ProjectSlideshowForm';
import PanelContainer from './containers/PanelContainer';
import Panel from './containers/Panel';


class AdminDashboard extends Component {

  state = {
    selectedForm: undefined
  }

  getFormData = (url, callback) => fetch(url).then(res => res.json()).then(res => callback(res));
  getProjects = () => this.getFormData("/get/projects/", (res) => this.setState({ projects: res }));
  getImages = () => this.getFormData("/admin/get/images/", (res) => this.setState({ images: res }));
  getSlideshows = () => this.getFormData("/slideshow/all/", (res) => this.setState({ slideshows: res }));
  getStories = () => this.getFormData("/admin/get/stories/", (res) => this.setState({ stories: res }))
  getLocalVideos = () => this.getFormData("/admin/get/localVideo/", (res) => {
    this.setState({ localVideos: res })
  })

  componentDidMount = () => {
    this.getProjects();
    this.getImages();
    this.getSlideshows();
    this.getStories();
    this.getLocalVideos();
  }


  setFormHeaderText = heading => this.setState({ formHeaderText: heading });

  formHeaderText = () => this.state.formHeaderText ? this.state.formHeaderText : '';

  render() {
    const { projects, slideshows, images, stories, localVideos } = this.state;
    
    return (
      <div id="" className="page-container__admin">
        <header className="">
          <h4 className="">Home VJ: Admin Dashboard</h4>
        </header>
        <div className="container__admin">

        <div className="separator-with-info__admin separator-bar__admin">
            <h3>First:</h3>
            <div className="info-panel__admin">
              <p>
                Note: All time related settings are in seconds unless otherwise indicated.
              </p>
            </div>
        </div>

          <PanelContainer>
            <Panel panelSize="small" panelType="images-panel" heading="Add Images" form={ImagesForm} onSubmitCallback={this.getImages}/>
            <Panel panelSize="small" panelType="local-video-panel" heading="Add Local Video" form={LocalVideoForm} onSubmitCallback={this.getLocalVideos} />
          </PanelContainer>

          <div className="separator-bar__admin">
            <h3>Then:</h3>
          </div>

          <PanelContainer>
            <Panel panelSize="small" panelType="single-input-panel" heading="Create a Project" form={ProjectForm} onSubmitCallback={this.getProjects} />
            <Panel panelSize="small" panelType="single-input-panel" heading="Create a Slideshow" form={SlideshowForm} onSubmitCallback={this.getSlideshows} />
            <Panel panelSize="small" panelType="single-input-panel" heading="Add Slideshows to Project" form={ProjectSlideshowForm} additionalClasses="project-slideshow-form__admin" projects={projects} slideshows={slideshows}/>
          </PanelContainer>

          <div className="separator-bar__admin">
            <h3>Then:</h3>
          </div>

          <PanelContainer>
            <Panel panelSize="small" panelType="local-video-panel" heading="Add Images to Slideshow" form={SlideshowImagesForm} images={images} slideshows={slideshows} />
            <Panel panelSize="small" panelType="local-video-panel" heading="Add Videos to Project" form={ProjectLocalVideoForm} projects={projects} localVideos={localVideos} />
          </PanelContainer>

          <div className="separator-bar__admin">
            <h3>Finally:</h3>
          </div>

          <PanelContainer>
            <Panel panelSize="small" panelType="local-video-panel" heading="Create a Story" form={StoryForm} projects={projects} slideshows={slideshows} localVideos={localVideos} />
          </PanelContainer>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;