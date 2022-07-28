import React from 'react';
import Form from './Form';

class ProjectForm extends Form {

  state = {
    projectName: ""
  }

  headerText = "Create a Project";

  clearFormData = () => this.setState({ projectName: "" });


  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const { projectName } = this.state;
        projectName ?
          this.handleFormSubmit("/admin/create/project/", { projectName })
            .then(res => {
              this.clearFormData();
              this.props.onSubmitCallback();
            })
          : null;
      }
      }>
        <div className="medium-col__admin input-container__admin">
          <label htmlFor="projectName">Project Name:</label>
        </div>
        <div className="medium-col__admin input-container__admin">
          <input id="projectName" type="text" value={this.state.projectName} onChange={(e) => this.handleInput(e)} />
        </div>
        <div>
          <button type="submit" className="panel-btn__admin btn">Submit</button>
        </div>

      </form>
    )
  }
}

export default ProjectForm;