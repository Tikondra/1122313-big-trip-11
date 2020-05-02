import EventComponent from "../components/event";
import EventEditComponent from "../components/event-edit";

import {render, replace} from "../utils/render";
import {Place} from "../components/consts";

class PointController {
  constructor(container) {
    this._container = container.getElement();

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _onReplaceToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _onReplaceToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._eventComponent, this._eventEditComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onReplaceToEvent(evt);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  render(event) {
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventComponent.setEditBtnClickHandler(() => {
      this._onReplaceToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
    this._eventEditComponent.setSaveClickHandler((evt) => {
      evt.preventDefault();
      this._onReplaceToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this._container, this._eventComponent, Place.BEFOREEND);
  }
}

export default PointController;
