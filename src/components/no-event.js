import {createElement} from "../utils/render";

const createNoEvent = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

class NoEvent {
  constructor() {
    this._element = null;
  }

  getTemplate() {

    return createNoEvent();
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

export default NoEvent;
