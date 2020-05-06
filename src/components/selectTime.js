import {Format} from "./consts";
import moment from "moment";

const getDate = (date) => {
  return moment(date).format(Format.DATE_TIME_REVERS);
};

export const createSelectTime = (timeStart, timeEnd) => {

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
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDate(timeEnd)}">
    </div>`
  );
};
