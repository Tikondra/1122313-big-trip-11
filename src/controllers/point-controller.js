import EventComponent from "../components/event";
import EventEditComponent from "../components/event-edit";
import Point from "../models/point";

import {render, replace, remove} from "../utils/render";
import {Place, Mode, emptyPoint, Selector, ApiOption} from "../components/consts";
import {isEscKey} from "../utils/common";
import {encode} from "he";
import {getDestinationForCity, getOffersForType} from "../utils/common";

const parseFormData = (formData, id, destinations, offers) => {
  const type = formData.get(`event-type`).toLowerCase();
  const dateStart = formData.get(`event-start-time`);
  const dateEnd = formData.get(`event-end-time`);
  const city = encode(formData.get(`event-destination`));
  const destination = getDestinationForCity(city, destinations);
  const offersData = type ? getOffersForType(type, offers) : null;
  const pointOffers = formData.getAll(`event-offer-${type}`);
  const checkedOffers = offersData.filter((offer) => pointOffers.includes(offer.title));

  return new Point({
    "id": id,
    "base_price": parseInt(formData.get(`event-price`), 10),
    "date_from": dateStart ? new Date(dateStart) : null,
    "date_to": dateEnd ? new Date(dateEnd) : null,
    "destination": destination ? destination : {name: city, description: ``, pictures: []},
    "type": type.toLowerCase(),
    "offers": checkedOffers ? checkedOffers : [],
    "is_favorite": !!formData.get(`event-favorite`),
  });
};

class PointController {
  constructor(container, onDataChange, onViewChange, pointsModel) {
    this._container = container.getElement();
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._pointsModel = pointsModel;
    this._destinations = pointsModel.getDestinations();
    this._offers = pointsModel.getOffers();

    this._eventComponent = null;
    this._eventEditComponent = null;

    this.shake = this.shake.bind(this);
    this._setTimeout = this._setTimeout.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event, mode, this._pointsModel);

    this._addListeners(event);

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._onReplaceToEvent();
        } else {
          render(this._container, this._eventComponent, Place.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(oldEventEditComponent);
          remove(oldEventComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, Place.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onReplaceToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${ApiOption.SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${ApiOption.SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventEditComponent.getElement().style.border = `2px solid red`;

    setTimeout(this._setTimeout, ApiOption.SHAKE_ANIMATION_TIMEOUT);
  }

  _setTimeout() {
    this._eventEditComponent.getElement().style.animation = ``;
    this._eventComponent.getElement().style.animation = ``;
    this._eventEditComponent.getElement().style.border = ``;

    this._eventEditComponent.setData({
      SAVE_BTN: `Save`,
      DELETE_BTN: `Delete`,
    });
  }

  _addListeners(event) {
    this._eventComponent.setEditBtnClickHandler(() => {
      this._onReplaceToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSaveClickHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData, event.id, this._destinations, this._offers);

      this._eventEditComponent.setData({
        SAVE_BTN: `Saving...`,
      });

      this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      if (this._mode === Mode.ADDING) {
        document.querySelector(Selector.DAY).remove();
      }

      this._eventEditComponent.setData({
        DELETE_BTN: `Deleting...`,
      });

      this._onDataChange(this, event, null);
    });
  }

  _onReplaceToEdit() {
    this._onViewChange();
    this._eventEditComponent.applyFlatpickr();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _onReplaceToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);

      this._eventEditComponent.delleteFlatpickr();
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (isEscKey(evt.key)) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, emptyPoint, null);
        document.querySelector(Selector.DAY).remove();
      }
      this._onReplaceToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default PointController;
