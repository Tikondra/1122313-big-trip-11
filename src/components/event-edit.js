import AbstractSmartComponent from "./abstract-smart-component";
import {createOffers} from "./offers";
import {createDestination} from "./destination";
import {createHeader} from "./header-event";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import {Format, DefaultData} from "./consts";

const createEventEdit = (mode, options = {}) => {
  const {
    type,
    offers,
    isFavorite,
    destinations,
    isDestination,
    pointsModel,
    isOffers,
    externalData,
    allOffers,
    timeStart,
    timeEnd,
    basePrice
  } = options;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createHeader(type, timeStart, timeEnd, isFavorite, destinations.name, basePrice, mode, pointsModel, externalData)}
      <section class="event__details">
        ${createOffers(offers, type, isOffers, allOffers)}
        ${createDestination(destinations, isDestination)}
      </section>
     </form>`
  );
};

class EventEdit extends AbstractSmartComponent {
  constructor(point, mode, pointsModel) {
    super();

    this._event = point;
    this._type = point.type;
    this._offers = point.offers;
    this._isFavorite = point.isFavorite;
    this._destinations = point.destinations;
    this._isDestination = !!point.destinations;
    this._timeStart = point.timeStart;
    this._timeEnd = point.timeEnd;
    this._basePrice = point.basePrice;
    this._mode = mode;
    this._externalData = DefaultData;
    this._pointsModel = pointsModel;
    this._allOffers = pointsModel.getOffersForType(this._type);
    this._isOffers = this._allOffers.length > 0;
    this._saveHandler = null;
    this._deleteButtonClickHandler = null;
    this._flatpickrFrom = null;
    this._flatpickrTo = null;

    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeCity = this._onChangeCity.bind(this);
    this._onChangeDateFrom = this._onChangeDateFrom.bind(this);
    this._onChangeDateTo = this._onChangeDateTo.bind(this);
    this._onChangePrice = this._onChangePrice.bind(this);
    this._onChangeOffers = this._onChangeOffers.bind(this);
    this._onFavoriteToggle = this._onFavoriteToggle.bind(this);

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEdit(this._mode, {
      type: this._type,
      offers: this._offers,
      allOffers: this._pointsModel.getOffersForType(this._type),
      isFavorite: this._isFavorite,
      destinations: this._destinations,
      isDestination: this._isDestination,
      timeStart: this._timeStart,
      timeEnd: this._timeEnd,
      basePrice: this._basePrice,
      isOffers: this._isOffers,
      pointsModel: this._pointsModel,
      externalData: this._externalData,
    });
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  removeElement() {
    if (this._flatpickrFrom) {
      this._flatpickrFrom.destroy();
      this._flatpickrFrom = null;
    }

    if (this._flatpickrTo) {
      this._flatpickrTo.destroy();
      this._flatpickrTo = null;
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

    this.applyFlatpickr();
  }

  reset() {
    const point = this._event;

    this._type = point.type;
    this._offers = point.offers;
    this._isFavorite = point.isFavorite;
    this._destinations = point.destinations;
    this._isDestination = !!point.destinations;
    this._timeStart = point.timeStart;
    this._timeEnd = point.timeEnd;
    this._basePrice = point.basePrice;
    this._allOffers = this._pointsModel.getOffersForType(this._type);

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

  applyFlatpickr() {
    const startTimeElement = this.getElement().querySelector(`#event-start-time-1`);
    const endTimeElement = this.getElement().querySelector(`#event-end-time-1`);

    this.delleteFlatpickr();

    this._initFlatpickrFrom(startTimeElement, this._timeStart);
    this._initFlatpickrTo(endTimeElement, this._timeEnd);
  }

  delleteFlatpickr() {
    if (this._flatpickrFrom) {
      this._flatpickrFrom.destroy();
      this._flatpickrFrom = null;
    }
    if (this._flatpickrTo) {
      this._flatpickrTo.destroy();
      this._flatpickrTo = null;
    }
  }

  _initFlatpickrFrom(element, date) {
    this._flatpickrFrom = flatpickr(element, this._optionsFlatpickr(date, null, this._timeEnd));
  }

  _initFlatpickrTo(element, date) {
    this._flatpickrTo = flatpickr(element, this._optionsFlatpickr(date, this._timeStart, null));
  }

  _optionsFlatpickr(date, minDate, maxDate) {
    return {
      enableTime: true,
      dateFormat: Format.DATE,
      defaultDate: date || ``,
      minDate,
      maxDate,
    };
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const favoriteBtn = element.querySelector(`.event__favorite-btn`);
    const offers = element.querySelector(`.event__available-offers`);

    if (favoriteBtn) {
      favoriteBtn.addEventListener(`click`, this._onFavoriteToggle);
    }

    if (offers) {
      offers.addEventListener(`change`, this._onChangeOffers);
    }

    element.querySelector(`.event__type-list`)
      .addEventListener(`click`, this._onChangeType);

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._onChangeCity);

    element.querySelector(`#event-start-time-1`)
      .addEventListener(`change`, this._onChangeDateFrom);

    element.querySelector(`#event-end-time-1`)
      .addEventListener(`change`, this._onChangeDateTo);

    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, this._onChangePrice);
  }

  _toggleDestination(evt, currentDestination) {
    if (currentDestination) {
      this._destinations = currentDestination;
      this._isDestination = true;
    } else {
      this._destinations.name = ``;
      this._isDestination = false;
    }
  }

  _onChangeType(evt) {
    if (evt.target.tagName === `INPUT`) {
      this._type = (evt.target.value).toLowerCase();
      this._allOffers = this._pointsModel.getOffersForType(this._type);
      this._offers = [];
      this._isOffers = this._allOffers.length > 0;
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

  _onChangeDateFrom(evt) {
    this._timeStart = new Date(evt.target.value);
    this.rerender();
  }

  _onChangeDateTo(evt) {
    this._timeEnd = new Date(evt.target.value);
    this.rerender();
  }

  _onChangePrice(evt) {
    const input = evt.target;

    if (!input.validity.patternMismatch) {
      this._basePrice = input.value;
      this.rerender();
    } else {
      input.setCustomValidity(`Используйте числовой формат`);
    }
  }

  _onChangeOffers(evt) {
    const offer = evt.target.value;
    const state = this._offers.findIndex((it) => it.title === offer);
    const offers = this._offers;

    if (state < 0) {
      const newOffer = {
        title: offer,
      };
      offers.push(newOffer);
    } else {
      offers.splice(state, 1);
    }

    this._offers = offers;
    this.rerender();
  }
}

export default EventEdit;
