import {Format, SortType, EvtKey} from "../components/consts";
import moment from "moment";

export const makeCounter = () => {
  function counter() {
    return counter.currentCount++;
  }
  counter.currentCount = 0;

  return counter;
};

export const isTrue = () => Math.random() > 0.5;

export const isEscKey = (currentKey) => currentKey === EvtKey.ESC;

export const getRandomIntegerNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const castTimeFormat = (value) => value < Format.LESS_TEN ? `0${value}` : String(value);

export const formatTime = (date) => moment(date).format(Format.TIME);

export const getIsoDate = (date) => moment(date).format(Format.ISO_DATE);

export const getSortByTime = (events) => {
  events.map((event) => {
    const startTime = moment(event.timeStart);
    const endTime = moment(event.timeEnd);
    event.duration = endTime.diff(startTime, `minutes`);
  });

  return events;
};

export const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const copyEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      const durationEvents = getSortByTime(copyEvents);
      sortedEvents = durationEvents.sort((a, b) => b.duration - a.duration);
      break;
    case SortType.PRICE:
      sortedEvents = copyEvents.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case SortType.EVENT:
      sortedEvents = copyEvents;
      break;
  }

  return sortedEvents;
};

export const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[j];

    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

export const getDateFrom = (dateTo) => {
  const dateFrom = new Date(dateTo);
  dateFrom.setDate(dateFrom.getDate() - Format.DAY_RANGE);
  return dateFrom;
};
