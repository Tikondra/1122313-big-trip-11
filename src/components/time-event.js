import {formatTime, castTimeFormat} from "./utils";
import {Format} from "./consts";

const getDuration = (start, end) => {
  const startValue = (start.getHours() * Format.IN_HOUR) + start.getMinutes();
  const endValue = (end.getHours() * Format.IN_HOUR) + end.getMinutes();
  const durationHour = Math.floor((endValue - startValue) / Format.IN_HOUR);
  const durationMinute = (endValue - startValue) % Format.IN_HOUR;
  const durationH = durationHour ? castTimeFormat(durationHour) + `H` : ``;
  const durationM = durationMinute ? castTimeFormat(durationMinute) + `M` : ``;

  return durationH + ` ` + durationM;
};

const getDataEvent = (start, end) => {
  const startTime = formatTime(start);
  const endTime = formatTime(end);
  const duration = getDuration(start, end);
  const date = start.getFullYear() + `-` + castTimeFormat(start.getMonth()) + `-` + castTimeFormat(start.getDay());

  return {
    startTime,
    endTime,
    duration,
    date,
  };
};

export const createTimeEvent = (timeStart, timeEnd) => {
  const {startTime, endTime, duration, date} = getDataEvent(timeStart, timeEnd);

  return (
    `<div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${date}T${startTime}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${date}T${endTime}">${endTime}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>`
  );
};
