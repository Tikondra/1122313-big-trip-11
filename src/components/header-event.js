import {createCitySelect} from "./select-city";
import {createEventType} from "./select-type";
import {createSelectTime} from "./selectTime";
import {createSelectPrice} from "./select-price";

export const createHeader = (typeEvent, timeStart) => {

  return (
    `<header class="event__header">
      ${createEventType(typeEvent)}
      ${createCitySelect(typeEvent)}
      ${createSelectTime(timeStart)}
      ${createSelectPrice()}
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
     </header>`
  );
};
