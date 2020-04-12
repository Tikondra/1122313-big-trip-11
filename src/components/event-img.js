import {createImg} from "./img-markup";

export const createEventImages = (pictures) => {
  const images = pictures
    .map((it) => createImg(it))
    .join(`\n`);

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${images}
      </div>
    </div>`
  );
};
