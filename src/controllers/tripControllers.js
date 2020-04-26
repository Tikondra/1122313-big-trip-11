import DayComponent from "../components/event-day";
import EventsListComponent from "../components/events";
import EventComponent from "../components/event";
import EventEditComponent from "../components/event-edit";

import {generateEvents, generateEvent} from "../Mocks/event-mock";

import {Place, EvenOption} from "../components/consts";

import {getRandomIntegerNumber} from "../utils/common";
import {replace, render} from "../utils/render";

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

let openEvent;
const events = generateEvents(EvenOption.COUNT, generateEvent);
const eventsCopy = events.slice();

class TripController {
  constructor(container) {
    this._container = container;
  }

  render(days) {
    const tripDays = document.querySelector(`.trip-days`);

    days.forEach((day) => {
      renderDay(tripDays, day);
    });
  }
}

export default TripController;
