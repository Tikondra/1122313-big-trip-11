import {EvtKey, Format, SortType} from "../components/consts";
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

export const getSortByDate = (points) => {
  const copyPoints = points.slice();

  return copyPoints.sort((a, b) => a.timeStart - b.timeStart);
};

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

export const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

export const getDurationMinutes = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);

  return endTime.diff(startTime, `minutes`);
};

export const toNormalCase = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getDestinationForCity = (city, destinations) => {
  const currentDestination = destinations.filter((it) => it.name === city);

  return currentDestination[0];
};

export const getOffersForType = (type, offers) => {
  const currentOffers = offers.filter((it) => it.type === type.toLowerCase());

  return currentOffers[0].offers;
};

export const disableControls = (state) => {
  const filters = document.querySelectorAll(`.trip-filters__filter-input`);
  const sorts = document.querySelectorAll(`.trip-sort__input`);

  [...filters, ...sorts].forEach((it) => it.disabled = state);
};
