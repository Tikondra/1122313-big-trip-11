import AbstractSmartComponent from "./abstract-smart-component";
import {createOffers} from "./offers";
import {createDestination} from "./destination";
import {createHeader} from "./header-event";
import {getOffersForType} from "../Mocks/event-mock";

const createEventEdit = (event, options = {}) => {
  const {timeStart, destinations, isFavorite} = event;
  const {type, offers} = options;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createHeader(type, timeStart, isFavorite, destinations)}
      <section class="event__details">
        ${createOffers(offers, type)}
        ${createDestination(destinations)}
      </section>
     </form>`
  );
};

class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._type = event.type;
    this._offers = event.offers;
    this._saveHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEdit(this._event, {
      type: this._type,
      offers: this._offers
    });
  }

  recoveryListeners() {
    this.setSaveClickHandler(this._saveHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setSaveClickHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._saveHandler = handler;
  }
  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          this._type = evt.target.value;
          this._offers = getOffersForType(evt.target.value);

          this.rerender();
        }
      });
  }
}

export default EventEdit;
