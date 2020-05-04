import {Format, SortType} from "../components/consts";

export const makeCounter = () => {
  function counter() {
    return counter.currentCount++;
  }
  counter.currentCount = 0;

  return counter;
};

export const isTrue = () => Math.random() > 0.5;

export const getRandomIntegerNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const castTimeFormat = (value) => value < Format.LESS_TEN ? `0${value}` : String(value);

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const copyEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = copyEvents.sort((a, b) => a.timeStart - b.timeStart);
      break;
    case SortType.PRICE:
      sortedEvents = copyEvents.sort((a, b) => a.basePrice - b.basePrice);
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
