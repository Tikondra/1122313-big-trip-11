import AbstractComponent from "./abstract-component";

const createEventsList = () => `<ul class="trip-events__list"></ul>`;

class EventsList extends AbstractComponent {
  getTemplate() {

    return createEventsList();
  }
}

export default EventsList;
