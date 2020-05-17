import AbstractSmartComponent from "./abstract-smart-component";
import {createOffers} from "./offers";
import {createDestination} from "./destination";
import {createHeader} from "./header-event";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import {Format} from "./consts";

const createEventEdit = (event, mode, options = {}) => {
  const {timeStart, timeEnd, basePrice} = event;
  const {type, offers, isFavorite, destinations, isDestination, pointsModel, isOffers} = options;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createHeader(type, timeStart, timeEnd, isFavorite, destinations.name, basePrice, mode, pointsModel)}
      <section class="event__details">
        ${createOffers(offers, type, isOffers)}
        ${createDestination(destinations, isDestination)}
      </section>
     </form>`
  );
};

class EventEdit extends AbstractSmartComponent {
  constructor(event, mode, pointsModel) {
    super();

    this._event = event;
    this._type = event.type;
    this._offers = event.offers;
    this._isOffers = event.offers.length > 0;
    this._isFavorite = event.isFavorite;
    this._destinations = event.destinations;
    this._isDestination = !!event.destinations;
    this._mode = mode;
    this._pointsModel = pointsModel;
    this._saveHandler = null;
    this._deleteButtonClickHandler = null;
    this._flatpickr = null;

    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeCity = this._onChangeCity.bind(this);
    this._onFavoriteToggle = this._onFavoriteToggle.bind(this);

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEdit(this._event, this._mode, {
      type: this._type,
      offers: this._offers,
      isFavorite: this._isFavorite,
      destinations: this._destinations,
      isDestination: this._isDestination,
      isOffers: this._isOffers,
      pointsModel: this._pointsModel,
    });
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSaveClickHandler(this._saveHandler);
    this._subscribeOnEvents();
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
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

  getData() {
    const form = this.getElement();

    return new FormData(form);
  }

  setSaveClickHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._saveHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    const startTimeElement = this.getElement().querySelector(`#event-start-time-1`);
    const endTimeElement = this.getElement().querySelector(`#event-end-time-1`);

    if (this._flatpickr) {
      this._delleteFlatpickr();
    }

    this._initFlatpickr(startTimeElement, this._event.timeStart);
    this._initFlatpickr(endTimeElement, this._event.timeEnd);
  }

  _initFlatpickr(element, date) {
    this._flatpickr = flatpickr(element, this._optionsFlatpickr(date));
  }

  _optionsFlatpickr(date) {
    return {
      enableTime: true,
      dateFormat: Format.DATE,
      defaultDate: date || ``,
    };
  }

  _delleteFlatpickr() {
    this._flatpickr.destroy();
    this._flatpickr = null;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const favoriteBtn = element.querySelector(`.event__favorite-btn`);

    if (favoriteBtn) {
      favoriteBtn.addEventListener(`click`, this._onFavoriteToggle);
    }

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
      this._type = (evt.target.value).toLowerCase();
      this._offers = this._pointsModel.getOffersForType(this._type);
      this._isOffers = this._offers.length > 0;
      this.rerender();
      evt.target.setAttribute(`checked`, true);
    }
  }

  _onChangeCity(evt) {
    const currentDestination = this._pointsModel.getDestinationForCity(evt.target.value)[0];
    this._toggleDestination(evt, currentDestination);
    this.rerender();
  }

  _onFavoriteToggle() {
    this._isFavorite = !this._isFavorite;
  }
}

export default EventEdit;
