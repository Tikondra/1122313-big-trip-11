import {createCitySelect} from "./select-city";
import {createEventType} from "./select-type";
import {createSelectTime} from "./selectTime";
import {createSelectPrice} from "./select-price";
import {Mode, CITIES} from "./consts";

const createFavoriteBtn = (isFavorite) => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>`
  );
};

export const createHeader = (typeEvent, timeStart, timeEnd, isFavorite, city, basePrice, mode) => {
  const resetBtn = mode === Mode.ADDING ? `Cancel` : `Delete`;
  const favoriteBtn = mode !== Mode.ADDING ? createFavoriteBtn(isFavorite) : ``;

  const isBlockSaveBtn = !CITIES.includes(city);

  return (
    `<header class="event__header">
      ${createEventType(typeEvent)}
      ${createCitySelect(typeEvent, city)}
      ${createSelectTime(timeStart, timeEnd)}
      ${createSelectPrice(basePrice)}

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isBlockSaveBtn ? `disabled` : ``}>Save</button>
      <button class="event__reset-btn" type="reset">${resetBtn}</button>
      ${favoriteBtn}
     </header>`
  );
};
