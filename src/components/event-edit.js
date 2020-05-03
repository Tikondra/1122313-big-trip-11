import AbstractComponent from "./abstract-component";
import {createOffers} from "./offers";
import {createDestination} from "./destination";
import {createHeader} from "./header-event";

const createEventEdit = (event) => {
  const {typeEvent, timeStart, options, destinations, pictures, isFavorite} = event;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createHeader(typeEvent, timeStart, isFavorite)}
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

  setSaveClickHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
  }
}

export default EventEdit;
