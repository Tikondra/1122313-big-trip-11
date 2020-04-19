import {createSort} from "./sort";
import {createEventEdit} from "./event-edit";
import {creatTripDaysCont} from "./days-container";

export const createBoard = (events) => {
  return (
    `${createSort()}
     ${createEventEdit(events[0])}
     ${creatTripDaysCont()}`
  );
};
