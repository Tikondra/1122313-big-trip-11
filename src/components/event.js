import AbstractComponent from "./abstract-component";
import {createTypeEvent} from "./type-event";
import {createTimeEvent} from "./time-event";
import {createOptions} from "./event-option";

const createEvent = (event) => {
  const {typeEvent, city, timeStart, timeEnd, eventPrice, options} = event;

  return (
    `<li class="trip-events__item">
      <div class="event">
        ${createTypeEvent(typeEvent, city)}
        ${createTimeEvent(timeStart, timeEnd)}
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
        </p>
        ${createOptions(options)}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

class Event extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {

    return createEvent(this._event);
  }
}

export default Event;
