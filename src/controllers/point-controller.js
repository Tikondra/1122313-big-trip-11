import EventComponent from "../components/event";
import EventEditComponent from "../components/event-edit";

import {render, replace} from "../utils/render";
import {Place, Mode} from "../components/consts";

class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container.getElement();
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

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

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onReplaceToEvent();
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
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _onReplaceToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
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
