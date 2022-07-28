import React from 'react';
import Form from './Form';
import AddProjectSlideshowRow from './form-rows/AddProjectSlideshowRow';
import Dropdown from '../../../shared-components/Dropdown';

class ProjectSlideshowForm extends Form {
  state = {
    selectedProject: undefined,
    slideshowsToAdd: [
      {
        id: 0,
        slideshowId: undefined,
        random: false
      }
    ]
  }

  handleCheckboxChange = (e) => {
    document.getElementById("random").checked ? this.setState({ random: 1 }) : this.setState({ random: 0 })
  }

  handleSlideshowPropertyChange = (e, idOfSlideshowToChange) => {
    const slideshowsToAdd = this.state.slideshowsToAdd;
    slideshowsToAdd[idOfSlideshowToChange][e.target.name] = e.target.value;
    this.setState({ slideshowsToAdd }, () => this.spawnNewInputIfNecessary(this.state.slideshowsToAdd));
  }

  lastItemInSlideshowInputArrayContainsInput = slideshowsToAdd => this.lastItemInArray(slideshowsToAdd).slideshowId || this.lastItemInArray(slideshowsToAdd).positionInSlideshow;

  spawnNewInputIfNecessary = (slideshowsToAdd) => {
    if (this.lastItemInSlideshowInputArrayContainsInput(slideshowsToAdd)) {
      slideshowsToAdd.push({ id: slideshowsToAdd.length, slideshowId: undefined, positionInSlideshow: undefined });
      this.setState({ slideshowsToAdd });
    }
  }

  filterInvalidSlideshows = (slideshowsToAdd) => slideshowsToAdd.filter(el => el.slideshowId != undefined);

  addProjectIdToSlideshowObject = (slideshowsToAdd, selectedProject) => slideshowsToAdd.map(slideshow => ({ ...slideshow, projectId: selectedProject }));

  prepDataForSubmit = (slideshowsToAdd, selectedProject) => slideshowsToAdd[0].slideshowId ? this.addProjectIdToSlideshowObject(this.filterInvalidSlideshows(slideshowsToAdd), selectedProject) : [];

  clearFormData = () => this.setState({ selectedProject: undefined, slideshowsToAdd: [{ id: 0, slideshowId: undefined, random: false }] });

  render() {
    console.log(this.state);
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const { slideshowsToAdd, selectedProject } = this.state;
        let dataToSubmit = this.prepDataForSubmit(slideshowsToAdd, selectedProject);
        dataToSubmit ? this.handleFormSubmit("/admin/create/project-media/slideshows", { slideshowsToAdd: dataToSubmit }) : null;
        this.clearFormData();
      }
      }>
        <div>
          {this.props.projects ?
            <div>
              <div>
                <Dropdown id="selectedProject" classes="panel-dropdown__admin" type="Project" changeHandler={(e) => this.handleInput(e)} dropdownItems={this.props.projects} propToUseAsItemText="name" />
              </div>
            </div>
            : <h3>There are no projects.</h3>
          }
          {this.state.selectedProject ?
            <div>
              <div className="medium-col__admin input-container__admin">
                <label>Slideshow:</label>
                <label className="number-col__admin">Random?:</label>
              </div>
              {this.state.slideshowsToAdd.map((slideshowToAdd, i) => <AddProjectSlideshowRow key={i} slideshows={this.props.slideshows} slideshowToAdd={slideshowToAdd} changeHandler={this.handleSlideshowPropertyChange} />)}
            </div>
            : null
          }
          <div>
            <button type="submit" className="panel-btn__admin btn">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

export default ProjectSlideshowForm;