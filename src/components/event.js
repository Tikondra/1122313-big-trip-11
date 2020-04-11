import {formatTime, castTimeFormat} from "./utils";
import {IN_HOUR} from "./consts";

export const createEvent = (event) => {
  const {tipEvent, city, timeStart, timeEnd} = event;

  const getDuration = (start, end) => {
    const startValue = (start.getHours() * IN_HOUR) + start.getMinutes();
    const endValue = (end.getHours() * IN_HOUR) + end.getMinutes();
    const durationHour = Math.floor((endValue - startValue) / IN_HOUR);
    const durationMinute = (endValue - startValue) % IN_HOUR;
    const durationH = durationHour ? castTimeFormat(durationHour) + `H` : ``;
    const durationM = durationMinute ? castTimeFormat(durationMinute) + `M` : ``;

    return durationH + ` ` + durationM;
  };

  const getDataEvent = (start, end) => {
    const startTime = formatTime(start);
    const endTime = formatTime(end);
    const duration = getDuration(start, end);
    const date = start.getFullYear() + `-` + castTimeFormat(start.getMonth()) + `-` + castTimeFormat(start.getDay());
    const imgEvent = tipEvent.toLowerCase();

    return {
      startTime,
      endTime,
      duration,
      date,
      imgEvent
    };
  };

  const {startTime, endTime, duration, date, imgEvent} = getDataEvent(timeStart, timeEnd);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${imgEvent}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${tipEvent} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${date}T${startTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${date}T${endTime}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">20</span>
           </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
