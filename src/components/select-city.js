import {createOptionCity} from "./option-city";
import {toNormalCase} from "../utils/common";

const getCities = (CITIES) => CITIES.map((it) => createOptionCity(it)).join(`\n`);

export const createCitySelect = (typeEvent, city, CITIES) => {
  const type = toNormalCase(typeEvent);

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type} to
      </label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${city}"
        list="destination-list-1">
      <datalist id="destination-list-1">
        ${getCities(CITIES)}
      </datalist>
    </div>`
  );
};
