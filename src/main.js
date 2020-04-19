import HeaderInfoComponent from "./components/header-info";
import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import BoardComponent from "./components/board";
import DayComponent from "./components/event-day";
import EventsListComponent from "./components/events";
import EventComponent from "./components/event";
import EventEditComponent from "./components/event-edit";

import {generateDay, generateEvent, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {getRandomIntegerNumber, render} from "./components/utils";

const renderEvent = (container, event) => {
  const replaceEventToEdit = () => {
    openEvent = [eventComponent.getElement(), eventEditComponent.getElement()];
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToTask = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
    openEvent = null;
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
      openEvent = null;
    }
  };

  const eventComponent = new EventComponent(event);
  const editBtn = eventComponent.getElement().querySelector(`.event__rollup-btn`);

  editBtn.addEventListener(`click`, () => {
    if (!openEvent) {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  const eventEditComponent = new EventEditComponent(event);

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, eventComponent.getElement(event), Place.BEFOREEND);
};

const renderDay = (tripDays, day) => {
  const dayComponent = new DayComponent(day);
  const eventListComponent = new EventsListComponent();

  render(tripDays, dayComponent.getElement(day), Place.BEFOREEND);

  const eventDay = tripDays.querySelector(`#day${day.dayCounter}`);

  render(eventDay, eventListComponent.getElement(), Place.BEFOREEND);

  const eventList = eventDay.querySelector(`.trip-events__list`);

  eventsCopy.splice(0, getRandomIntegerNumber(5, 1))
    .forEach((event) => {
      renderEvent(eventList, event);
    });
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

render(headerInfo, headerInfoComponent.getElement(), Place.AFTERBEGIN);
render(tripMenuTitle, menuComponent.getElement(), Place.AFTERNODE);
render(tripControls, filterComponent.getElement(), Place.BEFOREEND);
render(tripBoard, sortComponent.getElement(), Place.BEFOREEND);
render(tripBoard, boardComponent.getElement(), Place.BEFOREEND);

const tripDays = document.querySelector(`.trip-days`);

days.forEach((day) => {
  renderDay(tripDays, day);
});
