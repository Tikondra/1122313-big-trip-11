import {Place, Format} from "../components/consts";

export const makeCounter = () => {
  function counter() {
    return counter.currentCount++;
  }
  counter.currentCount = 0;

  return counter;
};

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

export const render = (container, element, place) => {
  switch (place) {
    case Place.AFTERBEGIN:
      container.prepend(element);
      break;
    case Place.BEFOREEND:
      container.append(element);
      break;
    case Place.AFTERNODE:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
