import AbstractComponent from "./abstract-component";

const createBoard = () => `<ul class="trip-days"></ul>`;

class Board extends AbstractComponent {
  getTemplate() {

    return createBoard();
  }
}

export default Board;
