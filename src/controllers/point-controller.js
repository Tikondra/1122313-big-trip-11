import EventComponent from "../components/event";
import EventEditComponent from "../components/event-edit";

import {render, replace} from "../utils/render";
import {Place} from "../components/consts";

class PointController {
  constructor(container, onDataChange) {
    this._container = container.getElement();
    this._onDataChange = onDataChange;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._addListeners(event);

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent, Place.BEFOREEND);
    }
  }

  _addListeners() {
    this._eventComponent.setEditBtnClickHandler(() => {
      this._onReplaceToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSaveClickHandler((evt) => {
      evt.preventDefault();
      this._onReplaceToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
  }

  _onReplaceToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _onReplaceToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();
    replace(this._eventComponent, this._eventEditComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onReplaceToEvent(evt);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default PointController;
