import {createOffers} from "./offers";
import {createDestination} from "./destination";
import {createHeader} from "./header-event";

export const createEventEdit = (event) => {
  const {typeEvent, timeStart, options, destinations} = event;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createHeader(typeEvent, timeStart)}
      <section class="event__details">
        ${createOffers(options)}
        ${createDestination(destinations)}
      </section>
     </form>`
  );
};
