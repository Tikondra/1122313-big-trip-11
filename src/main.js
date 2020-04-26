import HeaderInfoComponent from "./components/header-info";
import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import BoardComponent from "./components/board";
import DayComponent from "./components/event-day";
import EventsListComponent from "./components/events";
import EventComponent from "./components/event";
import EventEditComponent from "./components/event-edit";
import NoEventComponent from "./components/no-event";

import {generateDay, generateEvent, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {getRandomIntegerNumber} from "./utils/common";
import {render, replace} from "./utils/render";

const replaceEventToEdit = (eventComponent, eventEditComponent) => {
  openEvent = true;
  replace(eventEditComponent, eventComponent);
};

const replaceEditToTask = (eventComponent, eventEditComponent) => {
  replace(eventComponent, eventEditComponent);
  openEvent = null;
};

const renderEvent = (container, event) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask(eventComponent, eventEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
      openEvent = null;
    }
  };

  const onReplaceToEdit = () => {
    if (!openEvent) {
      replaceEventToEdit(eventComponent, eventEditComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onReplaceToEvent = (evt) => {
    evt.preventDefault();
    replaceEditToTask(eventComponent, eventEditComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const eventComponent = new EventComponent(event);

  eventComponent.setEditBtnClickHandler(onReplaceToEdit);

  const eventEditComponent = new EventEditComponent(event);

  eventEditComponent.setSaveClickHandler(onReplaceToEvent);

  render(container, eventComponent, Place.BEFOREEND);
};

const renderDay = (tripDays, day) => {
  const eventListComponent = new EventsListComponent();

  render(tripDays, new DayComponent(day), Place.BEFOREEND);

  const eventDay = tripDays.querySelector(`#day${day.dayCounter}`);

  render(eventDay, eventListComponent, Place.BEFOREEND);

  const eventList = eventDay.querySelector(`.trip-events__list`);

  eventsCopy.splice(0, getRandomIntegerNumber(5, 1))
    .forEach((event) => {
      renderEvent(eventList, event);
    });
};

const init = () => {
  render(headerInfo, headerInfoComponent, Place.AFTERBEGIN);
  render(tripMenuTitle, menuComponent, Place.AFTERNODE);
  render(tripControls, filterComponent, Place.BEFOREEND);
  render(tripBoard, sortComponent, Place.BEFOREEND);
  render(tripBoard, boardComponent, Place.BEFOREEND);

  const tripDays = document.querySelector(`.trip-days`);

  days.forEach((day) => {
    renderDay(tripDays, day);
  });
};

const noEventInit = () => {
  render(headerInfo, headerInfoComponent, Place.AFTERBEGIN);
  render(tripMenuTitle, menuComponent, Place.AFTERNODE);
  render(tripControls, filterComponent, Place.BEFOREEND);
  render(tripBoard, new NoEventComponent(), Place.AFTERBEGIN);
};

const headerInfo = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripMenuTitle = tripControls.querySelector(`h2`);
const tripBoard = document.querySelector(`.trip-events`);

const events = generateEvents(EvenOption.COUNT, generateEvent);
const eventsCopy = events.slice();
const days = generateEvents(EvenOption.DAY_COUNT, generateDay);

const headerInfoComponent = new HeaderInfoComponent();
const menuComponent = new MenuComponent();
const filterComponent = new FilterComponent();
const sortComponent = new SortComponent();
const boardComponent = new BoardComponent();

let openEvent;

if (days.length === 0) {
  noEventInit();
} else {
  init();
}
