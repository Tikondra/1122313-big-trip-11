import {formatTime, castTimeFormat, getIsoDate} from "../utils/common";
import {Format} from "./consts";
import moment from "moment";

const getDuration = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);
  const duration = endTime.diff(startTime, `minutes`);

  const durationHour = Math.floor(duration / Format.IN_HOUR);
  const durationMinute = (duration) % Format.IN_HOUR;
  const durationH = durationHour ? castTimeFormat(durationHour) + `H` : ``;
  const durationM = durationMinute ? castTimeFormat(durationMinute) + `M` : ``;

  return durationH + ` ` + durationM;
};

const getDataEvent = (start, end) => {
  const startTime = formatTime(start);
  const endTime = formatTime(end);
  const duration = getDuration(start, end);

  return {
    startTime,
    endTime,
    duration
  };
};

export const createTimeEvent = (timeStart, timeEnd) => {
  const {startTime, endTime, duration} = getDataEvent(timeStart, timeEnd);

  return (
    `<div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${getIsoDate(timeStart)}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${getIsoDate(timeEnd)}">${endTime}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>`
  );
};
