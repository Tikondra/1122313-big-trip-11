import {CITIES} from "./consts";
import {createOptionCity} from "./option-city";
import {getRandomArrayItem} from "./utils";

const getCities = () => CITIES.map((it) => createOptionCity(it)).join(`\n`);

export const createCitySelect = (typeEvent) => {

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${typeEvent} to
      </label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${getRandomArrayItem(CITIES)}"
        list="destination-list-1">
      <datalist id="destination-list-1">
        ${getCities()}
      </datalist>
    </div>`
  );
};
