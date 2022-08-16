import React, { useState, useEffect } from 'react';
import { handleFormSubmit, handleInput, spawnNewInput } from '../../../utils/sharedFormFunctions';
import useAPI from './form-hooks/useAPI';
import Dropdown from '../../../shared-components/Dropdown';
import StoryLocalVideoRow from './form-rows/StoryLocalVideoRow';
import StorySlideshowRow from './form-rows/StorySlideshowRow';
import StoryDuration, { getVideoDuration } from './form-ui/StoryDuration';
import LocalVideo from '../../../media-types/LocalVideo';
import { defaultSlideshowSlideDuration } from '../../../media-types/Slideshow';
import { lastItemInArray } from '../../../utils/utils';

const StoryForm = () => {
  const getInitialisedStory = () => ({
    storyType: "routine",
    selectedProject: undefined,
    alternateMediaType: false,
    randomiseMedia: false,
    storyDuration: '',
    storyName: "",
  })

  const { slideshows, projects, localVideos } = useAPI().data;
  const [storyProps, setStoryProps] = useState(getInitialisedStory());
  const [mediaItemsToAdd, setMediaItems] = useState([{ mediaType: undefined }])
  const { storyType, randomiseMedia, alternateMediaType, selectedProject, storyName, storyDuration } = storyProps;

  const dropdownHasASelectedMediaType = storyItem => storyItem.slideshowId || storyItem.localVideoId;

  useEffect(() => spawnNewInput(mediaItemsToAdd, () => dropdownHasASelectedMediaType(lastItemInArray(mediaItemsToAdd)), { mediaType: undefined }, setMediaItems), [mediaItemsToAdd]);

  const shouldSetDefaultDuration = (e, storyItem) => e.target.name == "slideDuration" && storyItem.playEntireSlideshow;

  const handleMediaComponentTextAndDropdownChange = (e, i) => {
    const storyItems = [...mediaItemsToAdd];
    const storyItem = storyItems[i];

    if (shouldSetDefaultDuration(e, storyItem)) {
      storyItem.slideshowDuration = calculateSlideshowDuration(storyItem);
    }

    if (e.target.name == "slideshow") {
      storyItem.slideshowId = e.target.value;
    } else if (e.target.name == "localVideo") {
      storyItem.localVideoId = e.target.value
    } else {
      storyItem[e.target.name] = e.target.value;
    }

    storyItems[i] = storyItem;
    setMediaItems([...storyItems]);
  }

  const checkboxisChecked = (e, id) => e.target.name == id && e.target.checked;

  const checkboxisUnChecked = (e, id) => e.target.name == id && !e.target.checked;

  const handleMediaItemCheckboxChange = (e, i) => {
    const storyItems = [...mediaItemsToAdd];
    const storyItem = storyItems[i];
    if (checkboxisChecked(e, "playEntireVideo")) {
      storyItem.videoDuration = '';
    }

    if (checkboxisChecked(e, "playEntireSlideshow")) {
      storyItem.slideshowDuration = calculateSlideshowDuration(storyItem);
    }

    if (checkboxisUnChecked(e, "playEntireSlideshow")) {
      storyItem.slideshowDuration = '';
    }

    storyItem[e.target.name] = e.target.checked;
    storyItems[i] = storyItem;
    setMediaItems([...storyItems]);
  }

  const handleCheckboxChange = (e) => {
    setStoryProps({
      ...storyProps, [e.target.name]: storyProps[e.target.name] ? false : true
    })
  }

  const initialiseBookmarkProps = () => {
    setMediaItems(mediaItemsToAdd.map(mediaItem => {
      if (mediaItem.bookmarkVideo) {
        mediaItem.bookmarkVideo = false;
      }
      return mediaItem;
    })
    )
  }

  const handleRadioSelect = (e) => {
    e.target.value == "scheduled" ? initialiseBookmarkProps(mediaItemsToAdd) : null;
    setStoryProps({
      ...storyProps,
      storyType: e.target.value,
      randomiseMedia: e.target.value == "scheduled" ? false : randomiseMedia,
      alternateMediaType: e.target.value == "scheduled" ? false : alternateMediaType
    });
  }

  const handleMediaSelect = (e, i) => {
    const mediaItems = [...mediaItemsToAdd];
    if (e.target.value == "slideshow") {
      mediaItems[i] = generateSlideshowItemProps();
    } else if (e.target.value == "localVideo") {
      mediaItems[i] = generateLocalVideoItemProps();
    }
    setMediaItems([...mediaItems])
  }

  const generateLocalVideoItemProps = () => {
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

  const getNumberOfSlideshowSlides = (slideshowId, slideshows) => {
    let numberOfSlides = undefined;
    try {
      numberOfSlides = slideshows.find(slideshow => slideshow.id == slideshowId)['count(b.slideshowId)'];
    } catch (err) {
      console.log(err);
    } finally {
      return numberOfSlides;
    }
  }

  const generateSlideshowItemProps = () => {
    return {
      mediaType: "slideshow",
      slideshowId: "",
      random: false,
      playEntireSlideshow: false,
      slideshowDuration: "",
      slideDuration: "",
    }
  }

  const generateMediaInputs = (item, i) => {
    if (mediaItemsToAdd[i].mediaType == "slideshow") {
      return <StorySlideshowRow index={i} slideshowValues={mediaItemsToAdd[i]} handleCheckboxChange={handleMediaItemCheckboxChange} handleTextAndDropdownChange={handleMediaComponentTextAndDropdownChange} slideshows={slideshows} />
    } else {
      return <StoryLocalVideoRow index={i} storyType={storyType} localVideoValues={mediaItemsToAdd[i]} handleCheckboxChange={handleMediaItemCheckboxChange} handleTextAndDropdownChange={handleMediaComponentTextAndDropdownChange} localVideos={localVideos} />
    }
  }

  const ensureSlideshowHasDuration = filteredMediaItems => {
    return filteredMediaItems.map(mediaItem => {
      if (mediaItem.mediaType == "slideshow" && mediaItem.slideshowDuration == '') {
        mediaItem.slideshowDuration = calculateSlideshowDuration(mediaItem);
      }
      return mediaItem;
    })
  }

  const calculateSlideshowDuration = (slideshow) => (slideshow.slideDuration || defaultSlideshowSlideDuration) * getNumberOfSlideshowSlides(slideshow.slideshowId, props.slideshows);

  const getFormParams = () => ({ ...storyProps, mediaItems: ensureSlideshowHasDuration(mediaItemsToAdd.filter(item => item.mediaType)) })

  const durationIsValid = (item, localVideos) => {
    const { startAtPosition, videoDuration, localVideo } = item;
    const totalDurationInS = LocalVideo.convertVideoDurationToS(getVideoDuration(localVideo, localVideos));
    if (item.startAtPosition) {
      return parseInt(startAtPosition) + parseInt(videoDuration) <= totalDurationInS;
    }
    const beginningOfVideo = 0;
    return beginningOfVideo + item.videoDuration <= totalDurationInS;
  }

  const durationsAreValid = (localVideos, mediaItemsToAdd) => {
    let durationsAreValid = true;
    mediaItemsToAdd.forEach(item => {
      if (item.mediaType == "localVideo" && item.localVideo && !durationIsValid(item, localVideos)) {
        durationsAreValid = false;
      }
    });
    return durationsAreValid;
  }

  const clearFormData = () => {
    setStoryProps(getInitialisedStory());
  }

  const formSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit("admin/create/story", getFormParams());
    clearFormData();
  }

  return (
    <form className="story-form__admin" onSubmit={(e) => formSubmit(e)}>
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
      <div id="story-options" className={selectedProject ? `story-options-with-project__admin` : `story-options-no-project__admin`}>
        {projects ?
          <div>
            <div>
              <Dropdown id="selectedProject" name="selectedProject" classes="" type="Project" changeHandler={(e) => handleInput(e, setStoryProps, storyProps)} dropdownItems={projects} propToUseAsItemText="name" value={selectedProject} />
            </div>
          </div>
          : <p>Please create a project</p>
        }

        {/* Each form control has it's own check to avoid a clash between space-evenly and React's parent container constraint  */}
        {selectedProject ?
          <div>
            <label htmlFor="storyName">Story Name:</label>
            <input id="storyName" name="storyName" type="text" value={storyName} onChange={(e) => handleInput(e, setStoryProps, storyProps)} />
          </div>
          : null
        }
        {selectedProject ?
          <div className="radio-controls__admin">
            <input type="radio" checked={storyType == "routine"} id="routine" value="routine" onChange={(e) => handleRadioSelect(e)} />
            <label htmlFor="routine">Routine</label>
            <input type="radio" id="scheduled" checked={storyType == "scheduled"} value="scheduled" onChange={(e) => handleRadioSelect(e)} />
            <label htmlFor="scheduled">Scheduled</label>
          </div>
          : null
        }
        {selectedProject ?
          <div>
            <label htmlFor="alternateMedia" hidden={storyType == "scheduled" ? true : false}>Alternate Media:</label>
            <input type="checkbox" id="alternateMediaType" name="alternateMediaType" checked={alternateMediaType} onChange={(e) => handleCheckboxChange(e)} hidden={storyType == "scheduled" ? true : false} />
          </div>
          : null
        }
        {selectedProject ?
          <div>
            <label htmlFor="random" hidden={storyType == "scheduled" ? true : false}>Random:</label>
            <input type="checkbox" id="randomiseMedia" name="randomiseMedia" value={randomiseMedia} onChange={(e) => handleCheckboxChange(e)} hidden={storyType == "scheduled" ? true : false} />
          </div>
          : null
        }
      </div>
      {selectedProject ?
        mediaItemsToAdd.map((item, i) => {
          return (
            <div className="story-item__admin" key={i}>
              <Dropdown
                id={`media-selector-${i}`}
                classes=""
                type="Media Type"
                changeHandler={(e) => handleMediaSelect(e, i)}
                dropdownItems={[{ id: "slideshow", name: "Slideshow", }, { id: "localVideo", name: "Local Video", }]}
                propToUseAsItemText="name"
                value={item.mediaType || ""}
              />
              {item.mediaType ? generateMediaInputs(item, i) : null}
            </div>
          )
        })
        : null
      }
      <div className="story-panel-footer__admin">
        <button type="submit" className="panel-btn__admin btn" disabled={storyType == "scheduled" && !durationsAreValid(localVideos, mediaItemsToAdd)}>Submit</button>
        {storyType == "scheduled" ?
          <div>
            <div>
              <label>Enter a story duration in seconds:</label>
              <input className="number-col__admin" type="number" value={storyDuration} onChange={(e) => setStoryProps({ ...storyProps, storyDuration: e.target.value })} />
              <StoryDuration mediaItems={mediaItemsToAdd} storyDuration={storyDuration} slideshows={slideshows} localVideos={localVideos} getNumberOfSlideshowSlides={getNumberOfSlideshowSlides} />
            </div>
          </div>
          : null}
      </div>
    </form>
  )
}

export default StoryForm;