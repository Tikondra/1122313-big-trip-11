import {createImg} from "./img-markup";

const getImages = (pictures) => pictures.map((it) => createImg(it)).join(`\n`);

export const createEventImages = (pictures) => {

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${getImages(pictures)}
      </div>
    </div>`
  );
};
