import React from 'react';
import Form from './Form';
import Dropdown from '../../../shared-components/Dropdown';
import StoryLocalVideoRow from './form-rows/StoryLocalVideoRow';
import StorySlideshowRow from './form-rows/StorySlideshowRow';
import StoryDuration, { getVideoDuration } from './form-ui/StoryDuration';
import LocalVideo from '../../../media-types/LocalVideo';
import { defaultSlideshowSlideDuration } from '../../../media-types/Slideshow';

class StoryForm extends Form {

  state = {
    storyType: "routine",
    alternateMediaType: false,
    randomiseMedia: false,
    storyDuration: '',
    storyName: "",
    storyMediaItems: [
      {
        mediaType: undefined
      }
    ],
  }

  clearFormData = () => {
    this.setState({
      storyType: "routine",
      alternateMediaType: false,
      randomiseMedia: false,
      storyName: "",
      storyMediaItems: [
        {
          mediaType: undefined
        }
      ]
    });
  }

  dropdownHasASelectedMediaType = storyItem => storyItem["slideshowId"] || storyItem["localVideoId"];

  spawnNewItemIfNecessary = () => {
    const storyItem = this.state.storyMediaItems[this.state.storyMediaItems.length - 1];
    if (this.dropdownHasASelectedMediaType(storyItem)) {
      const nextState = { ...this.state };
      nextState.storyMediaItems.push({ mediaType: undefined })
      this.setState(nextState);
    }
  }

  shouldSetDefaultDuration = (e, storyItem) => e.target.name == "slideDuration" && storyItem.playEntireSlideshow;

  handleMediaComponentTextAndDropdownChange = (e, i) => {
    const nextState = { ...this.state };

    if (this.shouldSetDefaultDuration(e, nextState.storyMediaItems[i])) {
      nextState.storyMediaItems[i].slideshowDuration = this.calculateSlideshowDuration(nextState.storyMediaItems[i]);
    }

    if (e.target.name == "slideshow") {
      nextState.storyMediaItems[i].slideshowId = e.target.value;
    } else if (e.target.name == "localVideo") {
      nextState.storyMediaItems[i].localVideoId = e.target.value
    } else {
      nextState.storyMediaItems[i][e.target.name] = e.target.value;
    }

    this.setState(nextState, () => this.spawnNewItemIfNecessary());
  }

  checkboxisChecked = (e, id) => e.target.name == id && e.target.checked;

  checkboxisUnChecked = (e, id) => e.target.name == id && !e.target.checked;

  handleMediaItemCheckboxChange = (e, i) => {
    const nextState = { ...this.state };
    if (this.checkboxisChecked(e, "playEntireVideo")) {
      nextState.storyMediaItems[i].videoDuration = '';
    }

    if (this.checkboxisChecked(e, "playEntireSlideshow")) {
      nextState.storyMediaItems[i].slideshowDuration = this.calculateSlideshowDuration(nextState.storyMediaItems[i]);
    }

    if (this.checkboxisUnChecked(e, "playEntireSlideshow")) {
      nextState.storyMediaItems[i].slideshowDuration = '';
    }

    nextState.storyMediaItems[i][e.target.name] = e.target.checked;
    this.setState(nextState, () => this.spawnNewItemIfNecessary());
  }

  handleCheckboxChange = (e) => {
    const nextState = { ...this.state };
    nextState[e.target.id] = document.getElementById(e.target.id).checked ? true : false;
    this.setState(nextState, this.spawnNewItemIfNecessary());
  }

  initialiseBookmarks = storyMediaItems => {
    this.setState({
      storyMediaItems: storyMediaItems.map(mediaItem => {

        if (mediaItem.bookmarkVideo) {
          mediaItem.bookmarkVideo = false;
        }
        return mediaItem;
      })
    })
  }

  handleRadioSelect = (e) => {
    const { randomiseMedia, alternateMediaType, storyMediaItems } = this.state;
    e.target.value == "scheduled" ? this.initialiseBookmarks(storyMediaItems) : null;
    this.setState({
      storyType: e.target.value,
      randomiseMedia: e.target.value == "scheduled" ? false : randomiseMedia,
      alternateMediaType: e.target.value == "scheduled" ? false : alternateMediaType
    });
  }

  handleMediaSelect = (e, i) => {
    const storyMediaItems = [...this.state.storyMediaItems];
    if (e.target.value == "slideshow") {
      storyMediaItems[i] = this.generateSlideshowItemProps();
    } else if (e.target.value == "localVideo") {
      storyMediaItems[i] = this.generateLocalVideoItemProps();
    }
    this.setState({ storyMediaItems: storyMediaItems })
  }

  generateLocalVideoItemProps = () => {
    return {
      mediaType: "localVideo",
      localVideoId: "",
      videoStartTime: "",
      playEntireVideo: false,
      videoDuration: "",
      startAtPosition: "",
      playbackSpeed: "",
      bookmarkVideo: 0
    }
  }

  getNumberOfSlideshowSlides = (slideshowId, slideshows) => {
    let numberOfSlides = undefined;
    try {
      numberOfSlides = slideshows.find(slideshow => slideshow.id == slideshowId)['count(b.slideshowId)'];
    } catch (err) {
      console.log(err);
    } finally {
      return numberOfSlides;
    }
  }

  generateSlideshowItemProps = () => {
    return {
      mediaType: "slideshow",
      slideshowId: "",
      random: false,
      playEntireSlideshow: false,
      slideshowDuration: "",
      slideDuration: "",
    }
  }

  generateMediaInputs = (item, i) => {
    if (this.state.storyMediaItems[i].mediaType == "slideshow") {
      return <StorySlideshowRow index={i} slideshowValues={this.state.storyMediaItems[i]} handleCheckboxChange={this.handleMediaItemCheckboxChange} handleTextAndDropdownChange={this.handleMediaComponentTextAndDropdownChange} slideshows={this.props.slideshows} />
    } else {
      return <StoryLocalVideoRow index={i} storyType={this.state.storyType} localVideoValues={this.state.storyMediaItems[i]} handleCheckboxChange={this.handleMediaItemCheckboxChange} handleTextAndDropdownChange={this.handleMediaComponentTextAndDropdownChange} localVideos={this.props.localVideos} />
    }
  }

  ensureSlideshowHasDuration = (storyMediaItems) => {
    return storyMediaItems.map(mediaItem => {
      if (mediaItem.mediaType == "slideshow" && mediaItem.slideshowDuration == '') {
        mediaItem.slideshowDuration = this.calculateSlideshowDuration(mediaItem);
      }
      return mediaItem;
    })
  }

  calculateSlideshowDuration = (slideshow) => (slideshow.slideDuration || defaultSlideshowSlideDuration) * this.getNumberOfSlideshowSlides(slideshow.slideshowId, this.props.slideshows);

  getFormParams = () => {
    const { selectedProject, storyType, storyName, alternateMediaType, randomiseMedia, storyMediaItems } = this.state;
    return { selectedProject, storyType, storyName, alternateMediaType, randomiseMedia, storyMediaItems: this.ensureSlideshowHasDuration(storyMediaItems.filter(item => item.mediaType)) }
  }

  durationIsValid = (item, localVideos) => {
    const { startAtPosition, videoDuration, localVideo } = item;
    const totalDurationInS = LocalVideo.convertVideoDurationToS(getVideoDuration(localVideo, localVideos));
    if (item.startAtPosition) {
      return parseInt(startAtPosition) + parseInt(videoDuration) <= totalDurationInS;
    }
    const beginningOfVideo = 0;
    return beginningOfVideo + item.videoDuration <= totalDurationInS;
  }

  durationsAreValid = (localVideos, storyMediaItems) => {
    let durationsAreValid = true;
    storyMediaItems.forEach(item => {
      if (item.mediaType == "localVideo" && item.localVideo && !this.durationIsValid(item, localVideos)) {
        durationsAreValid = false;
      }
    });
    return durationsAreValid;
  }

  render() {
    return (
      <form className="story-form__admin" onSubmit={(e) => {
        e.preventDefault(e);
        this.handleFormSubmit("admin/create/story", this.getFormParams());
        this.clearFormData();
      }
      }>
        <div className="info-panel__admin">
          <p>
            Stories can be used to sequence slideshows and videos. The order in which each story item is selected will define the order in which they are played (unless the story's "random" or "alternate media" options are enabled).
          </p>
          <p>
            A "routine" story will loop back to the first item and run in perpetuity. It is intended for general visuals to run in the background during a range of songs. This mode supports the video bookmark option. When enabled video bookmarking will force a video, on subsequent playthroughs, to resume playing at the point where it was previously interrupted.
          </p>
          <p>
            A "scheduled" story will only play through once. This format is intended for items to be "scheduled" using the duration options so that they trigger at key points during a specific song,
            so they can be used to display lyrics or emphasise a key theme from the song. When this story type is selected there is a field in the bottom right corner where you can enter the song running time (in seconds)
            and be informed how much song time you have left to fill with story items.
          </p>
          <p>
            NOTE: Duration times are important and strictly enforced. In practical terms this means that if a duration is invalid (the duration of the story item exceeds the actual video's run time) the submit button will be disabled.
          </p>
        </div>
        <div id="story-options" className={this.state.selectedProject ? `story-options-with-project__admin` : `story-options-no-project__admin`} b>
          {this.props.projects ?
            <div>
              <div>
                <Dropdown id="selectedProject" classes="" type="Project" changeHandler={(e) => this.handleInput(e)} dropdownItems={this.props.projects} propToUseAsItemText="name" />
              </div>
            </div>
            : <p>Please create a project</p>
          }

          {/* Each form control has it's own check to avoid a clash between space-evenly and React's parent container constraint  */}
          {this.state.selectedProject ?
            <div>
              <label htmlFor="storyName">Story Name:</label>
              <input id="storyName" type="text" value={this.state.storyName} onChange={(e) => this.handleInput(e)} />
            </div>
            : null
          }
          {this.state.selectedProject ?
            <div className="radio-controls__admin">
              <label></label>
              <input type="radio" checked={this.state.storyType == "routine"} id="routine" name="story_type" value="routine" onChange={(e) => this.handleRadioSelect(e)} />
              <label htmlFor="routine">Routine</label>
              <input type="radio" id="scheduled" checked={this.state.storyType == "scheduled"} name="story_type" value="scheduled" onChange={(e) => this.handleRadioSelect(e)} />
              <label htmlFor="scheduled">Scheduled</label>
            </div>
            : null
          }
          {this.state.selectedProject ?
            <div>
              <label htmlFor="alternateMedia" hidden={this.state.storyType == "scheduled" ? true : false}>Alternate Media:</label>
              <input type="checkbox" id="alternateMediaType" name="alternateMediaType" value={this.state.alternateMediaType} onChange={(e) => this.handleCheckboxChange(e)} hidden={this.state.storyType == "scheduled" ? true : false} />
            </div>
            : null
          }
          {this.state.selectedProject ?
            <div>
              <label htmlFor="random" hidden={this.state.storyType == "scheduled" ? true : false}>Random:</label>
              <input type="checkbox" id="randomiseMedia" name="randomiseMedia" value={this.state.randomiseMedia} onChange={(e) => this.handleCheckboxChange(e)} hidden={this.state.storyType == "scheduled" ? true : false} />
            </div>
            : null
          }
        </div>
        {this.state.selectedProject ?
          this.state.storyMediaItems.map((item, i) => {
            return (
              <div className="story-item__admin" key={i}>
                <Dropdown
                  id={`media-selector-${i}`}
                  classes=""
                  type="Media Type"
                  changeHandler={(e) => this.handleMediaSelect(e, i)}
                  dropdownItems={[{ id: "slideshow", name: "Slideshow", }, { id: "localVideo", name: "Local Video", }]}
                  propToUseAsItemText="name"
                />
                {item.mediaType ? this.generateMediaInputs(item, i) : null}
              </div>
            )
          })
          : null
        }
        <div className="story-panel-footer__admin">
          <button type="submit" className="panel-btn__admin btn" disabled={this.state.storyType == "scheduled" && !this.durationsAreValid(this.state.localVideos, this.state.storyMediaItems)}>Submit</button>
          {this.state.storyType == "scheduled" ?
            <div>
              <div>
                <label>Enter a story duration in seconds:</label>
                <input className="number-col__admin" type="number" value={this.state.storyDuration} onChange={(e) => this.setState({ storyDuration: e.target.value })} />
                <StoryDuration storyMediaItems={this.state.storyMediaItems} storyDuration={this.state.storyDuration} slideshows={this.props.slideshows} localVideos={this.props.localVideos} getNumberOfSlideshowSlides={this.getNumberOfSlideshowSlides} />
              </div>
            </div>
            : null}
        </div>
      </form>
    )
  }
}

export default StoryForm;