import {makeCounter} from "../utils/common";
import {Format} from "../components/consts";
import moment from "moment";

const dayCounter = makeCounter();

export const getDays = (events) => {
  const dayDates = [];
  const days = [];
  const sortedEvents = events.sort((current, previous) => current.timeStart - previous.timeStart);
  dayCounter.currentCount = 0;

  sortedEvents.map((event) => {
    if (!dayDates.includes(moment(event.timeStart).format(Format.DAY_DATE))) {
      dayDates.push(moment(event.timeStart).format(Format.DAY_DATE));
      days.push(generateDay(event.timeStart));
    }
  });

  return days;
};

const generateDay = (date) => {
  const dateTime = moment(date).format(Format.DATE_TIME);
  const dayDate = moment(date).format(Format.DAY_DATE);

  return {
    dayCounter: dayCounter() + 1,
    dateTime,
    dayDate
  };
};

export {generateDay};
