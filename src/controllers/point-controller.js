import EventComponent from "../components/event";
import EventEditComponent from "../components/event-edit";

import {render, replace, remove} from "../utils/render";
import {Place, Mode, emptyPoint, Selector} from "../components/consts";
import {isEscKey} from "../utils/common";

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

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event, mode);

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

  _addListeners(event) {
    this._eventComponent.setEditBtnClickHandler(() => {
      this._onReplaceToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSaveClickHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      if (this._mode === Mode.ADDING) {
        document.querySelector(Selector.DAY).remove();
      }
      this._onDataChange(this, event, null);
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

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);
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
