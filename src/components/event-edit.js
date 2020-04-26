import AbstractComponent from "./abstract-component";
import {createOffers} from "./offers";
import {createDestination} from "./destination";
import {createHeader} from "./header-event";

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

class EventEdit extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {

    return createEventEdit(this._event);
  }
}

export default EventEdit;
