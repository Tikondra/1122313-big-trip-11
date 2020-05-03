import DayComponent from "../components/event-day";
import EmptyDayComponent from "../components/empty-day";
import EventsListComponent from "../components/events";
import SortComponent from "../components/sort";
import PointController from "./point-controller";

import {Place, EvenOption, SortType} from "../components/consts";

import {generateEvents, generateEvent} from "../Mocks/event-mock";
import {getRandomIntegerNumber, getSortedEvents} from "../utils/common";
import {render} from "../utils/render";

const renderEventsForDay = (eventListComponent, events, onDataChange, onViewChange) => {
  const eventsForDay = events.splice(0, getRandomIntegerNumber(5, 1));
  return renderOnlyEvents(eventListComponent, eventsForDay, onDataChange, onViewChange);
};

const renderOnlyEvents = (eventListComponent, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(eventListComponent, onDataChange, onViewChange);

    pointController.render(event);

    return pointController;
  });
};

class TripController {
  constructor(container) {
    this._container = container;
    this._days = [];
    this._events = [];
    this._showedEventControllers = [];

    this._sortComponent = new SortComponent();
    this._emptyDay = new EmptyDayComponent();
    this._eventListComponent = new EventsListComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortRender = this._onSortRender.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortRender);
  }

  render(days) {
    this._days = days;
    this._events = generateEvents(EvenOption.COUNT, generateEvent);
    const eventsCopy = this._events.slice();
    const container = this._container.getElement();

    render(container, this._sortComponent, Place.BEFORENODE);

    this._renderDays(container, eventsCopy);
  }

  _renderDays(container, events) {
    this._days.forEach((day) => {
      this._renderDay(container, day, events);
    });
  }

  _renderDay(container, day, eventsCopy) {
    const eventListComponent = new EventsListComponent();
    const eventDay = new DayComponent(day);

    render(container, eventDay, Place.BEFOREEND);

    render(eventDay.getElement(), eventListComponent, Place.BEFOREEND);

    const newEvents = renderEventsForDay(eventListComponent, eventsCopy, this._onDataChange, this._onViewChange);
    this._showedEventControllers = this._showedEventControllers.concat(newEvents);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedEventControllers.forEach((event) => event.setDefaultView());
  }

  _onSortRender(sortType) {
    const tripDays = this._container.getElement();

    const sortedEvents = getSortedEvents(this._events, sortType);

    tripDays.innerHTML = ``;

    if (sortType !== SortType.EVENT) {
      render(tripDays, this._emptyDay, Place.BEFOREEND);

      const eventDay = tripDays.querySelector(`.day`);

      render(eventDay, this._eventListComponent, Place.BEFOREEND);

      this._eventListComponent.getElement().innerHTML = ``;

      const newEvents = renderOnlyEvents(this._eventListComponent, sortedEvents, this._onDataChange, this._onViewChange);
      this._showedEventControllers = this._showedEventControllers.concat(newEvents);
    } else {
      this._renderDays(tripDays, sortedEvents, this._onDataChange, this._onViewChange);
    }
  }
}

export default TripController;
