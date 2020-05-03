import {createEventImages} from "./event-img";

export const createDestination = (destinations) => {
  const {description, pictures} = destinations;

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${createEventImages(pictures)}
    </section>`
  );
};
