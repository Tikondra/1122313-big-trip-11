import {createTripInfo} from "./trip-info";
import {createTripCost} from "./trip-cost";
import {createMenu} from "./menu";
import {createFilter} from "./filter";
import {createNewEventBtn} from "./newEvent";

export const createHeaderInfo = () => {

  return (
    `<section class="trip-main__trip-info  trip-info">
            ${createTripInfo()}
            ${createTripCost()}
     </section>

     <div class="trip-main__trip-controls  trip-controls">
            ${createMenu()}
            ${createFilter()}
     </div>
     ${createNewEventBtn()}`
  );
};

