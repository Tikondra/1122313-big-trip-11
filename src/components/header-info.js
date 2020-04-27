import {createTripInfo} from "./trip-info";
import {createTripCost} from "./trip-cost";
import AbstractComponent from "./abstract-component";

const createHeaderInfo = () => {

  return (
    `<section class="trip-main__trip-info  trip-info">
            ${createTripInfo()}
            ${createTripCost()}
     </section>`
  );
};

class HeaderInfo extends AbstractComponent {
  getTemplate() {

    return createHeaderInfo();
  }
}

export default HeaderInfo;
