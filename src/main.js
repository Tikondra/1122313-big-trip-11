import {creatTripInfo} from "./components/trip-info";
import {createTripCost} from "./components/trip-cost";
import {createMenu} from "./components/menu";
import {createFilter} from "./components/filter";
import {createSort} from "./components/sort";
import {createEventEdit} from "./components/event-edit";
import {creatTripDaysCont} from "./components/days-container";
import {createEventDay} from "./components/event-day";
import {createEvent} from "./components/event";

const EVENT_COUNT = 3;

const Place = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const tripInfoContainer = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const cleanContainer = (container) => {
  container.innerHTML = ``;
};

const renderCard = (container, elem, count) => {
  for (let i = 0; i < count; i++) {
    render(container, elem, Place.BEFOREEND);
  }
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

const init = () => {
  render(tripInfoContainer, creatTripInfo(), Place.AFTERBEGIN);

  const tripInfo = tripInfoContainer.querySelector(`.trip-info`);

  render(tripInfo, createTripCost(), Place.BEFOREEND);

  cleanContainer(tripControls);

  render(tripControls, createMenu(), Place.AFTERBEGIN);
  render(tripControls, createFilter(), Place.BEFOREEND);

  cleanContainer(tripEvents);

  render(tripEvents, createSort(), Place.AFTERBEGIN);
  render(tripEvents, createEventEdit(), Place.BEFOREEND);
  render(tripEvents, creatTripDaysCont(), Place.BEFOREEND);

  const tripDays = tripEvents.querySelector(`.trip-days`);

  render(tripDays, createEventDay(), Place.BEFOREEND);

  const eventList = tripDays.querySelector(`.trip-events__list`);

  renderCard(eventList, createEvent(), EVENT_COUNT);
};

init();
