import {getOffersForType} from "../Mocks/event-mock";

export const CITIES = [`Amsterdam`, `Geneva`, `Venice`, `Tokyo`, `Los Angeles`, `Ottawa`];
export const DESTINATION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
export const OFFERS_DESCRIPTION = [
  `Order Uber`,
  `Add luggage`,
  `Rent a car`,
  `Add breakfast`,
  `Switch to comfort`,
  `Book tickets`,
  `Lunch in city`
];
export const HIDDEN_CLASS = `visually-hidden`;
export const BAR_HEIGHT = 55;

export const EvenOption = {
  DAY_COUNT: 5,
  COUNT: 25,
  TYPE_TRANSPORT: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  TYPE_ACTIVITY: [`Check-in`, `Sightseeing`, `Restaurant`],
};

export const Format = {
  LESS_TEN: 10,
  HOURS_RANGE: 10,
  MINUTES_RANGE: 60,
  DAY_RANGE: 7,
  DAY_MIN: 1,
  START_TIME: 6,
  IN_HOUR: 60,
  IN_DAY: 24,
  YEAR: 2,
  DATE: `m/d/y H:i`,
  TIME: `hh:mm`,
  ISO_DATE: `YYYY-MM-DDTHH:mm`,
  DATE_TIME: `YYYY-MM-DD`,
  DATE_TIME_REVERS: `MM/DD/YY hh:mm`,
  DAY_DATE: `MMM DD`
};

export const ApiOption = {
  AUTHORIZATION: `Basic hgdjfh786kjdsfsldjfls`,
  END_POINT: `https://11.ecmascript.pages.academy/big-trip`,
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};

export const Place = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTERNODE: `after`,
  BEFORENODE: `before`
};

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const emptyPoint = {
  basePrice: ``,
  timeStart: new Date(),
  timeEnd: new Date(),
  destinations: {name: ``, description: ``, pictures: []},
  id: new Date() + Math.random(),
  isFavorite: false,
  offers: getOffersForType(`Taxi`),
  type: `Taxi`,
};

export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`,
};

export const EvtKey = {
  ESC: `Escape`
};

export const ButtonsText = {
  CANCEL: `Cancel`,
  DELETE: `Delete`,
};

export const TagName = {
  A: `A`,
};

export const Selector = {
  DAY: `.day`
};

export const TypeChart = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME_SPENT: `TIME SPENT`
};

export const typeIcon = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🚢`,
  'transport': `🚙`,
  'drive': `🚗`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sightseeing': `🏛️`,
  'restaurant': `🍴`
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};
