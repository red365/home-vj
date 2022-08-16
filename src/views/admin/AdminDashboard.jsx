import React, { useState, useEffect, useContext, createContext } from 'react';
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

const AdminDashboard = props => {
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

        <PanelContainer >
          <Panel panelSize="small" panelType="images-panel" heading="Add Images" form={ImagesForm} />
          <Panel panelSize="small" panelType="local-video-panel" heading="Add Local Video" form={LocalVideoForm} />
        </PanelContainer >


        <div className="separator-bar__admin">
          <h3>Then:</h3>
        </div>

        <PanelContainer>
          <Panel panelSize="small" panelType="single-input-panel" heading="Create a Project" form={ProjectForm} />
          <Panel panelSize="small" panelType="single-input-panel" heading="Create a Slideshow" form={SlideshowForm} />
          <Panel panelSize="small" panelType="single-input-panel" heading="Add Slideshows to Project" form={ProjectSlideshowForm} additionalClasses="project-slideshow-form__admin" />
        </PanelContainer>

        <div className="separator-bar__admin">
          <h3>Then:</h3>
        </div>

        <PanelContainer>
          <Panel panelSize="small" panelType="local-video-panel" heading="Add Images to Slideshow" form={SlideshowImagesForm} />
          <Panel panelSize="small" panelType="local-video-panel" heading="Add Videos to Project" form={ProjectLocalVideoForm} />
        </PanelContainer>

        <div className="separator-bar__admin">
          <h3>Finally:</h3>
        </div>

        <PanelContainer>
          <Panel panelSize="small" panelType="local-video-panel" heading="Create a Story" form={StoryForm} />
        </PanelContainer>
      </div>
    </div>
  )
}

export default AdminDashboard;