import {Place, Format} from "./consts";
import {createEvent} from "./event";

export const isTrue = () => Math.random() > 0.5;

export const cleanContainer = (container) => {
  container.innerHTML = ``;
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

export const renderEvents = (container, events, count) => {
  for (let i = 0; i < count; i++) {
    render(container, createEvent(events[i]), Place.BEFOREEND);
  }
};

export const render = (container, template, place) => container.insertAdjacentHTML(place, template);
