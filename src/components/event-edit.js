import AbstractSmartComponent from "./abstract-smart-component";
import {createOffers} from "./offers";
import {createDestination} from "./destination";
import {createHeader} from "./header-event";
import {getDestinationForCity, getOffersForType} from "../Mocks/event-mock";

const createEventEdit = (event, options = {}) => {
  const {timeStart, timeEnd, basePrice} = event;
  const {type, offers, isFavorite, destinations, isDestination} = options;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createHeader(type, timeStart, timeEnd, isFavorite, destinations, basePrice)}
      <section class="event__details">
        ${createOffers(offers, type)}
        ${createDestination(destinations, isDestination)}
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
    this._isFavorite = event.isFavorite;
    this._destinations = event.destinations;
    this._saveHandler = null;
    this._isDestination = !!event.destinations;

    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeCity = this._onChangeCity.bind(this);
    this._onFavoriteToggle = this._onFavoriteToggle.bind(this);

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEdit(this._event, {
      type: this._type,
      offers: this._offers,
      isFavorite: this._isFavorite,
      destinations: this._destinations,
      isDestination: this._isDestination
    });
  }

  recoveryListeners() {
    this.setSaveClickHandler(this._saveHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const event = this._event;

    this._type = event.type;
    this._offers = event.offers;
    this._isFavorite = event.isFavorite;
    this._destinations = event.destinations;
    this._isDestination = !!event.destinations;

    this.rerender();
  }

  setSaveClickHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._saveHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._onFavoriteToggle);

    element.querySelector(`.event__type-list`)
      .addEventListener(`click`, this._onChangeType);

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._onChangeCity);
  }

  _toggleDestination(evt, currentDestination) {
    if (currentDestination) {
      this._destinations = currentDestination;
      this._isDestination = true;
    } else {
      this._destinations.name = evt.target.value;
      this._isDestination = false;
    }
  }

  _onChangeType(evt) {
    if (evt.target.tagName === `INPUT`) {
      this._type = evt.target.value;
      this._offers = getOffersForType(evt.target.value);

      this.rerender();
    }
  }

  _onChangeCity(evt) {
    const currentDestination = getDestinationForCity(evt.target.value);
    this._toggleDestination(evt, currentDestination);
    this.rerender();
  }

  _onFavoriteToggle() {
    this._isFavorite = !this._isFavorite;
  }
}

export default EventEdit;
