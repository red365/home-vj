import React, { useState, useEffect } from 'react';
import { handleFormSubmit, handleInput } from '../../../utils/sharedFormFunctions';
import useAPI from './form-hooks/useAPI';

const ProjectForm = props => {
  const { getProjects } = useAPI();
  const [projectName, setProjectName] = useState("");

  const clearFormData = () => setProjectName("");

  const formSubmit = (e) => {
    e.preventDefault();
    projectName ? handleFormSubmit("/admin/create/project/", { projectName }).then(res => {
      clearFormData();
      getProjects();
    })
      : null;
  }

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div className="medium-col__admin input-container__admin">
        <label htmlFor="projectName">Project Name:</label>
      </div>
      <div className="medium-col__admin input-container__admin">
        <input id="projectName" name="projectName" type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      </div>
      <div>
        <button type="submit" className="panel-btn__admin btn">Submit</button>
      </div>

    </form>
  )
}

export default ProjectForm;