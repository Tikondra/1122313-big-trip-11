import {createEvent} from "./event";

export const createEvents = (events) => {
  const eventsList = events
    .map((it) => createEvent(it))
    .join(`\n`);

  return (
    `<ul class="trip-events__list">
        ${eventsList}
     </ul>`
  );
};
