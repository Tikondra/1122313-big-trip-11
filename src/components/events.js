import {createEvent} from "./event";

const getEventsList = (events) => events.map((it) => createEvent(it)).join(`\n`);

export const createEvents = (events) => `<ul class="trip-events__list">${getEventsList(events)}</ul>`;
