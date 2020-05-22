import HeaderInfoComponent from "../components/header-info";
import DayComponent from "../components/event-day";
import EmptyDayComponent from "../components/empty-day";
import EventsListComponent from "../components/events";
import SortComponent from "../components/sort";
import NoEventComponent from "../components/no-event";
import PointController from "./point-controller";

import {
  emptyPoint,
  EvenOption,
  Format,
  Place,
  SortType,
  Mode as PointControllerMode,
  Selector, MenuItem
} from "../components/consts";
import moment from "moment";
import {getSortedEvents, makeCounter} from "../utils/common";
import {remove, render} from "../utils/render";

const dayCounter = makeCounter();

const getDays = (events) => {
  const dayDates = [];
  const days = [];
  const sortedEvents = events.sort((current, previous) => current.timeStart - previous.timeStart);
  dayCounter.currentCount = 0;

  sortedEvents.map((event) => {
    if (!dayDates.includes(moment(event.timeStart).format(Format.DAY_DATE))) {
      dayDates.push(moment(event.timeStart).format(Format.DAY_DATE));
      days.push(generateDay(event.timeStart));
    }
  });

  return days;
};

const generateDay = (date) => {
  const dateTime = moment(date).format(Format.DATE_TIME);
  const dayDate = moment(date).format(Format.DAY_DATE);

  return {
    dayCounter: dayCounter() + 1,
    dateTime,
    dayDate
  };
};

const renderEventsForDay = (eventListComponent, events, onDataChange, onViewChange, day, pointsModel) => {
  const eventsForDay = events.filter((event) => moment(event.timeStart).format(Format.DAY_DATE) === day.dayDate);

  return renderOnlyEvents(eventListComponent, eventsForDay, onDataChange, onViewChange, pointsModel);
};

const renderOnlyEvents = (eventListComponent, events, onDataChange, onViewChange, pointsModel) => {
  return events.map((event) => {
    const pointController = new PointController(eventListComponent, onDataChange, onViewChange, pointsModel);

    pointController.render(event, PointControllerMode.DEFAULT);

    return pointController;
  });
};

const header = document.querySelector(`.trip-main`);

class TripController {
  constructor(container, pointsModel, menuComponent, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;
    this._creatingEvent = null;

    this._events = [];
    this._showedEventControllers = [];
    this._showedDays = [];

    this._sortComponent = new SortComponent();
    this._emptyDay = new EmptyDayComponent();
    this._eventListComponent = new EventsListComponent();
    this._noEventComponent = new NoEventComponent();
    this._menuComponent = menuComponent;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortRender = this._onSortRender.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onAddNewEvent = this._onAddNewEvent.bind(this);
    this._changeApiPoint = this._changeApiPoint.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortRender);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    this._events = this._pointsModel.getPoints();
    const eventsCopy = this._events.slice();
    const container = this._container.getElement();
    const addPointBtn = document.querySelector(`.trip-main__event-add-btn`);

    addPointBtn.addEventListener(`click`, this._onAddNewEvent);

    if (this._events.length === 0) {
      render(container, this._noEventComponent, Place.AFTERBEGIN);
    } else {
      render(container, this._sortComponent, Place.BEFORENODE);

      this._renderDays(container, eventsCopy);
    }
  }

  createPoint() {
    if (this._creatingEvent) {
      return;
    }

    const newDay = new EmptyDayComponent();
    const newListEvents = new EventsListComponent();
    const tripDays = this._container.getElement();

    render(tripDays, newDay, Place.AFTERBEGIN);

    const eventDay = tripDays.querySelector(Selector.DAY);

    render(eventDay, newListEvents, Place.BEFOREEND);

    this._creatingEvent = new PointController(newListEvents, this._onDataChange, this._onViewChange, this._pointsModel);
    this._creatingEvent.render(emptyPoint, PointControllerMode.ADDING);
  }

  _removeEvents() {
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _removeDays() {
    this._showedDays.forEach((day) => remove(day));
    this._showedDays = [];
  }

  _updateEvents() {
    this._removeEvents();
    this._removeDays();

    const sortedEvents = this._pointsModel.getPoints();

    if (sortedEvents.length > 0) {
      this._renderDays(this._container.getElement(), sortedEvents);
    }

    this._updateInfo();
  }

  _resetSorting() {
    this._sortComponent.setSortType(SortType.EVENT);
    remove(this._sortComponent);
    render(this._container.getElement(), this._sortComponent, Place.BEFORENODE);
    this._sortComponent.setSortTypeChangeHandler(this._onSortRender);
  }

  _renderDays(container, events) {
    const days = getDays(events);

    days.forEach((day) => {
      this._renderDay(container, day, events);
    });
  }

  _renderDay(container, day, events) {
    const eventListComponent = new EventsListComponent();
    const eventDay = new DayComponent(day);
    this._showedDays.push(eventDay);

    render(container, eventDay, Place.BEFOREEND);

    render(eventDay.getElement(), eventListComponent, Place.BEFOREEND);

    const newEvents = renderEventsForDay(eventListComponent, events, this._onDataChange, this._onViewChange, day, this._pointsModel);
    this._showedEventControllers = this._showedEventControllers.concat(newEvents);
  }

  _addApiPoint(pointModel, pointController) {
    if (this._pointsModel.getPoints().length === 0) {
      this._noEventComponent.getElement().remove();
      render(this._container.getElement(), this._sortComponent, Place.BEFORENODE);
    }

    this._pointsModel.addPoint(pointModel);
    pointController.destroy();
    this._container.getElement().querySelector(Selector.DAY).remove();
    this._updateEvents();
  }

  _addPoint(pointController, oldData, newData) {
    this._creatingEvent = null;

    if (newData === null) {
      pointController.destroy();
      this._updateEvents();
    } else {
      this._api.createPoint(newData)
        .then((response) => this._addApiPoint(response, pointController))
        .catch(pointController.shake);
    }
  }

  _deleteApiPoint(id) {
    this._pointsModel.removePoint(id);
    this._updateEvents();

    if (this._pointsModel.getPoints().length === 0) {
      this._sortComponent.getElement().remove();
      render(this._container.getElement(), this._noEventComponent, Place.AFTERBEGIN);
    }
  }

  _deletePoint(pointController, oldData) {
    this._api.deletePoint(oldData.id)
      .then(() => this._deleteApiPoint(oldData.id))
      .catch(pointController.shake);
  }

  _changeApiPoint(pointModel, id, pointController) {
    const isSuccess = this._pointsModel.updatePoint(id, pointModel);

    if (isSuccess) {
      pointController.render(pointModel, PointControllerMode.DEFAULT);
      this._updateEvents();
    }
  }

  _changePoint(pointController, oldData, newData) {
    this._api.updatePoint(oldData.id, newData)
      .then((response) => this._changeApiPoint(response, oldData.id, pointController))
      .catch(pointController.shake);
  }

  _updateInfo() {
    document.querySelector(`.trip-main__trip-info`).remove();

    const headerInfo = new HeaderInfoComponent(this._pointsModel);
    render(header, headerInfo, Place.AFTERBEGIN);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === emptyPoint) {
      this._addPoint(pointController, oldData, newData);
    } else if (newData === null) {
      this._deletePoint(pointController, oldData);
    } else {
      this._changePoint(pointController, oldData, newData);
    }
  }

  _onFilterChange() {
    this._resetSorting();
    this._updateEvents(EvenOption.COUNT);
  }

  _onViewChange() {
    this._showedEventControllers.forEach((event) => event.setDefaultView());

    if (this._creatingEvent) {
      this._creatingEvent.destroy();
      this._creatingEvent = null;
    }
  }

  _onSortRender(sortType) {
    const tripDays = this._container.getElement();

    const sortedEvents = getSortedEvents(this._pointsModel.getPoints(), sortType);

    tripDays.innerHTML = ``;

    if (sortType !== SortType.EVENT) {
      render(tripDays, this._emptyDay, Place.BEFOREEND);

      const eventDay = tripDays.querySelector(`.day`);

      render(eventDay, this._eventListComponent, Place.BEFOREEND);

      this._eventListComponent.getElement().innerHTML = ``;

      const newEvents = renderOnlyEvents(this._eventListComponent, sortedEvents, this._onDataChange, this._onViewChange, this._pointsModel);
      this._showedEventControllers = this._showedEventControllers.concat(newEvents);
    } else {
      this._renderDays(tripDays, sortedEvents, this._onDataChange, this._onViewChange);
    }
  }

  _onAddNewEvent() {
    this._onViewChange();
    this.createPoint();
    this.show();
    this._menuComponent.setActiveItem(MenuItem.TABLE);
  }
}

export default TripController;
