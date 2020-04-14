import {generateEvent, generateEvents} from "../Mocks/event-mock";
import {EvenOption} from "./consts";
import {createEvents} from "./events";
import {createDayInfo} from "./day-info";

export const createEventDay = () => {
  const events = generateEvents(EvenOption.COUNT, generateEvent);

  return (
    `<li class="trip-days__item  day">
        ${createDayInfo()}
        ${createEvents(events)}
     </li>`
  );
};
