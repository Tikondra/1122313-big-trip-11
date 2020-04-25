import {castTimeFormat} from "../utils/common";
import {Format} from "./consts";

const getDate = (date) => {
  const dateValue = castTimeFormat(date.getDate()) + `/` + castTimeFormat(date.getMonth()) + `/` + castTimeFormat(date.getFullYear()).slice(Format.YEAR);
  const timeValue = castTimeFormat(date.getHours()) + `:` + castTimeFormat(date.getMinutes());
  return dateValue + ` ` + timeValue;
};

export const createSelectTime = (timeStart) => {

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDate(timeStart)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDate(timeStart)}">
    </div>`
  );
};
