import React from 'react';
import Form from './Form';
import Dropdown from '../../../shared-components/Dropdown';
import AddImageRow from './form-rows/AddImageRow';

class SlideshowImagesForm extends Form {
  state = {
    slideshows: undefined,
    selectedSlideshow: undefined,
    slideshowImages: undefined,
    images: undefined,
    imagesToAdd: [
      {
        id: 0,
        imageId: undefined,
        positionInSlideshow: undefined
      }
    ]
  }

  handleSlideshowSelection = (e) => this.setState({ selectedSlideshow: e.target.value });

  handleInput = (e, idOfImageToChange) => {
    const imagesToAdd = this.state.imagesToAdd;
    imagesToAdd[idOfImageToChange][e.target.name] = e.target.value;
    this.setState({ imagesToAdd: imagesToAdd }, () => this.spawnNewInputIfNecessary(this.state.imagesToAdd));
  }

  lastItemInImageInputArrayContainsInput = imagesToAdd => this.lastItemInArray(imagesToAdd).imageId || this.lastItemInArray(imagesToAdd).positionInSlideshow;

  spawnNewInputIfNecessary = (imagesToAdd) => {
    if (this.lastItemInImageInputArrayContainsInput(imagesToAdd)) {

      imagesToAdd.push({ id: imagesToAdd.length, imageId: undefined, positionInSlideshow: undefined });
      this.setState({ imagesToAdd: imagesToAdd });
    }
  }

  filterInvalidImages = () => this.state.imagesToAdd.filter(el => el.imageId != undefined);

  clearFormData = () => {
    this.setState({
      selectedSlideshow: undefined,
      slideshowImages: undefined,
      imagesToAdd: [
        {
          id: 0,
          imageId: undefined,
          positionInSlideshow: undefined
        }
      ]
    });
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const filteredImagesToAdd = this.filterInvalidImages();
        filteredImagesToAdd ? this.handleFormSubmit("/admin/create/slideshowImages/", { imagesToAddToSlideshow: filteredImagesToAdd, selectedSlideshow: this.state.selectedSlideshow }) : null;
        this.clearFormData();
      }
      }>
        {this.props.slideshows ?
          <div>
            <div>
              <Dropdown id="slideshow" classNames="" type="Slideshow" changeHandler={(e) => this.handleSlideshowSelection(e)} dropdownItems={this.props.slideshows} propToUseAsItemText="name" />
            </div>
          </div>
          : <p>Please add a slideshow</p>
        }
        {this.state.selectedSlideshow ?
          <div>
            <div className="medium-col__admin input-container__admin">
              <label>Image description:</label>
              <label className="number-col__admin">Slide number:</label>
            </div>
            {this.state.imagesToAdd.map((image, i) => <AddImageRow key={i} handleInput={this.handleInput} image={image} imagesToSelectFrom={this.props.images} />)}
            <div>
              <button type="submit" className="panel-btn__admin btn">Submit</button>
            </div>
          </div>
          : null}
      </form>
    )
  }
}

export default SlideshowImagesForm;