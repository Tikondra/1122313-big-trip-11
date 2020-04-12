import {createEventDay} from "./event-day";

export const creatTripDaysCont = () => {
  return (
    `<ul class="trip-days">
        ${createEventDay()}
     </ul>`
  );
};
