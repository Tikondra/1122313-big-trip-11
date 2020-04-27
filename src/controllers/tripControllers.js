import DayComponent from "../components/event-day";
import EmptyDayComponent from "../components/empty-day";
import EventsListComponent from "../components/events";
import EventComponent from "../components/event";
import EventEditComponent from "../components/event-edit";

import {generateEvents, generateEvent} from "../Mocks/event-mock";

import {Place, EvenOption, SortType} from "../components/consts";

import {getRandomIntegerNumber, getSortedEvents} from "../utils/common";
import {replace, render} from "../utils/render";
import SortComponent from "../components/sort";

const replaceEventToEdit = (eventComponent, eventEditComponent) => {
  openEvent = true;
  replace(eventEditComponent, eventComponent);
};

const replaceEditToTask = (eventComponent, eventEditComponent) => {
  replace(eventComponent, eventEditComponent);
  openEvent = null;
};

const eventRender = (container, events) => {
  events.forEach((event) => {
    renderEvent(container, event);
  });
};

const dayRender = (container, days, events) => {
  days.forEach((day) => {
    renderDay(container, day, events);
  });
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

const renderDay = (tripDays, day, eventsCopy) => {
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

let openEvent;

class TripController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._emptyDay = new EmptyDayComponent();
    this._eventListComponent = new EventsListComponent();
    this.onSortRender = this.onSortRender.bind(this);
  }

  onSortRender(tripDays, events, days, sortType) {
    const sortedEvents = getSortedEvents(events, sortType);

    tripDays.innerHTML = ``;

    if (sortType !== SortType.EVENT) {
      render(tripDays, this._emptyDay, Place.BEFOREEND);

      const eventDay = tripDays.querySelector(`.day`);

      render(eventDay, this._eventListComponent, Place.BEFOREEND);

      const eventList = eventDay.querySelector(`.trip-events__list`);

      eventList.innerHTML = ``;

      eventRender(eventList, sortedEvents);
    } else {
      dayRender(tripDays, days, sortedEvents);
    }
  }

  render(days) {
    const container = this._container.getElement();
    const tripDays = document.querySelector(`.trip-days`);
    const events = generateEvents(EvenOption.COUNT, generateEvent);
    const eventsCopy = events.slice();

    render(container, this._sortComponent, Place.BEFORENODE);

    dayRender(tripDays, days, eventsCopy);

    this._sortComponent.setSortTypeChangeHandler(this.onSortRender.bind(this, tripDays, events, days));
  }
}

export default TripController;
