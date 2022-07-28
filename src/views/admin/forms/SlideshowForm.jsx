import React from 'react';
import Form from './Form';
import Dropdown from '../../../shared-components/Dropdown';

class SlideshowForm extends Form {
  state = {
    slideshowName: ""
  }

  handleCheckboxChange = (e) => {
    document.getElementById("random").checked ? this.setState({ random: 1 }) : this.setState({ random: 0 })
  }

  clearFormData = () => this.setState({ slideshowName: "" });

  render() {
    console.log(this.state)
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.handleFormSubmit("/admin/create/slideshow/", { slideshowName: this.state.slideshowName })
          .then(res => {
            this.clearFormData();
            this.props.onSubmitCallback();
          });
      }
      }>
        <div>
          <div className="medium-col__admin input-container__admin">
            <label htmlFor="slideshowName" >Slideshow Name:</label>
          </div>
          <div className="medium-col__admin input-container__admin">
            <input id="slideshowName" type="text" value={this.state.slideshowName} onChange={(e) => this.handleInput(e)} />
          </div>
          <div>
            <button type="submit" className="panel-btn__admin btn">Submit</button>
          </div>

        </div>
      </form>
    )
  }
}

export default SlideshowForm;