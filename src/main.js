import {creatTripInfo} from "./components/trip-info";
import {createTripCost} from "./components/trip-cost";
import {createMenu} from "./components/menu";
import {createFilter} from "./components/filter";
import {createSort} from "./components/sort";
import {createEventEdit} from "./components/event-edit";
import {creatTripDaysCont} from "./components/days-container";
import {generateEvent, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {cleanContainer, render} from "./components/utils";

const tripInfoContainer = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const events = generateEvents(EvenOption.COUNT, generateEvent);

const init = () => {
  render(tripInfoContainer, creatTripInfo(), Place.AFTERBEGIN);

  const tripInfo = tripInfoContainer.querySelector(`.trip-info`);

  render(tripInfo, createTripCost(), Place.BEFOREEND);

  cleanContainer(tripControls);

  render(tripControls, createMenu(), Place.AFTERBEGIN);
  render(tripControls, createFilter(), Place.BEFOREEND);

  cleanContainer(tripEvents);

  render(tripEvents, createSort(), Place.AFTERBEGIN);
  render(tripEvents, createEventEdit(events[0]), Place.BEFOREEND);
  render(tripEvents, creatTripDaysCont(), Place.BEFOREEND);
};

init();
