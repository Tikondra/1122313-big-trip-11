import {createOffers} from "./offers";
import {createDestination} from "./destination";
import {createHeader} from "./header-event";
import {createElement} from "./utils";

const createEventEdit = (event) => {
  const {typeEvent, timeStart, options, destinations, pictures} = event;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createHeader(typeEvent, timeStart)}
      <section class="event__details">
        ${createOffers(options)}
        ${createDestination(destinations, pictures)}
      </section>
     </form>`
  );
};

class EventEdit {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {

    return createEventEdit(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default EventEdit;
