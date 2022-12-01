import React from 'react';
import { SRLWrapper } from "simple-react-lightbox";
import { convertSToMs } from '../../../utils/utils';

function SlideshowWrapper(props) {

  const slideshowImages = props.slideshow.map((image, i) => {
    return (
      <a key={i} href={`/static/img/${image.filename}`}>
        <img hidden id={`image-${i + 1}`} className="thumbnail" src={`/static/img/${image.filename}`} />
      </a>
    )
  })

  const options = {
    settings: {
      hideControlsAfter: 1000,
      overlayColor: "#000000",
      autoplaySpeed: convertSToMs(props.autoplaySpeed)
    },
    thumbnails: {
      showThumbnails: false,
    },
    progressBar: {
      showProgressBar: false,
    },
    buttons: {
      backgroundColor: "#000000"
    }
  }
  const callbacks = {
    // Simple-react-lightbox callback options
    // onSlideChange: object => console.log(object),
    // onLightboxOpened: object => console.log(object),
    // onLightboxClosed: props.onLightboxClosed,
    // onCountSlides: object => console.log(object)
  };

  $ ? setTimeout(() => { $("#openLightbox").click(); $("button[title='Play']").click() }, 1000) : setTimeout(() => document.getElementById("openLightbox").click(), 1000)
  return (
    <div>
      <SRLWrapper options={options} callbacks={callbacks}  >
        {slideshowImages}
      </SRLWrapper>
    </div>
  )
}

export default SlideshowWrapper;