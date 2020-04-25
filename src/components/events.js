import {createElement} from "../utils/render";

const createEventsList = () => `<ul class="trip-events__list"></ul>`;

class EventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {

    return createEventsList();
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

export default EventsList;
