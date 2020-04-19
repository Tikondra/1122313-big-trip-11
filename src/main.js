import {createSort} from "./components/sort";
import {createEventEdit} from "./components/event-edit";
import {creatTripDaysCont} from "./components/days-container";
import {generateEvent, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {cleanContainer, render} from "./components/utils";
import {createHeaderInfo} from "./components/header-info";

const headerInfo = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const events = generateEvents(EvenOption.COUNT, generateEvent);

const init = () => {
  cleanContainer(headerInfo);
  render(headerInfo, createHeaderInfo(), Place.AFTERBEGIN);

  cleanContainer(tripEvents);

  render(tripEvents, createSort(), Place.AFTERBEGIN);
  render(tripEvents, createEventEdit(events[0]), Place.BEFOREEND);
  render(tripEvents, creatTripDaysCont(), Place.BEFOREEND);
};

init();
