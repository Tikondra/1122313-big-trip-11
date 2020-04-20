import {createTripInfo} from "./trip-info";
import {createTripCost} from "./trip-cost";
import {createElement} from "./utils";

const createHeaderInfo = () => {

  return (
    `<section class="trip-main__trip-info  trip-info">
            ${createTripInfo()}
            ${createTripCost()}
     </section>`
  );
};

class HeaderInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {

    return createHeaderInfo();
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

export default HeaderInfo;
