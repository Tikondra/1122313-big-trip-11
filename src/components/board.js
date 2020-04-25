import {createElement} from "../utils/common";

const createBoard = () => `<ul class="trip-days"></ul>`;

class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {

    return createBoard();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Board;
