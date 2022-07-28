import React from 'react';
import { useLightbox } from 'simple-react-lightbox';

// In order to automate the opening of React Lightbox and then load, play and close two small buttons
// need to be rendered and programmatically clicked
function SlideshowButtons(props) {
    const { openLightbox, closeLightbox } = useLightbox();
    return (
      <div hidden={true}>
         <button id="openLightbox" onClick={() => {
            openLightbox(); 
            // Allow time for lightbox buttons to render and then use jquery if available as it's faster
            $ ? setTimeout(() => $("button[title='Play']").click(), 1000) : setTimeout(() => document.querySelector('[title="Play"]').click(), 1000);
           }
          } ></button>
         <button id="closeLightbox" onClick={() => closeLightbox()} ></button>
      </div>
    )
}

export default SlideshowButtons;