import React from 'react';
import Form from './Form';
import ImageInput from './form-inputs/ImageInput';

class ImagesForm extends Form {

    state = {
      imagesToAdd: [
        {
          id: 0,
          descriptionValue: "",
          filenameValue: ""
        }
      ]
    }
  
    handleInput = (value, id, fieldName) => {
      const inputData = this.state.imagesToAdd;
      inputData[id][fieldName] = value;
      this.setState({ imagesToAdd: inputData }, () => this.spawnNewInputIfNecessary());
    }

    lastItemInImageInputArrayContainsInput = () => this.state.imagesToAdd[this.state.imagesToAdd.length - 1].descriptionValue || this.state.imagesToAdd[this.state.imagesToAdd.length - 1].filenameValue;
  
    spawnNewInputIfNecessary() {
      if (this.lastItemInImageInputArrayContainsInput()) {
        const imagesToAdd = this.state.imagesToAdd;
        imagesToAdd.push({ id: imagesToAdd.length, descriptionValue: "", filenameValue: "" });
        this.setState({ imagesToAdd })
      }
    }

    clearFormData = () => {
      this.setState({
        imagesToAdd: [
          {
            id: 0,
            descriptionValue: "",
            filenameValue: ""
          }
        ]
      })
    }

    filterInvalidImagesAndSubmit = e => this.handleFormSubmit(e, "/admin/create/images/", {  });
  
    filterImagesToAdd = imagesToAdd => imagesToAdd.filter(image => image.descriptionValue != "" && image.filenameValue != "");

    render() {
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          let filteredImagesToAdd = this.filterImagesToAdd(this.state.imagesToAdd);
          filteredImagesToAdd ? 
            this.handleFormSubmit("/admin/create/images/", { filteredImagesToAdd })
            .then(res => {
              this.clearFormData();
              this.props.onSubmitCallback();
            })
          : null;
        }
        }>
          <div className="image-input-container__admin input-container__admin ">
            <label>Description:</label>
            <label>Filename:</label>
          </div>
            {this.state.imagesToAdd.map((inputData, i) => <ImageInput key={i} inputData={inputData} callback={this.handleInput} />)}
            <button type="submit" className="panel-btn__admin btn" >Submit</button>
        </form>
      )
    }
}

export default ImagesForm;