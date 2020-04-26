import HeaderInfoComponent from "./components/header-info";
import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import BoardComponent from "./components/board";
import NoEventComponent from "./components/no-event";
import TripController from "./controllers/tripControllers";

import {generateDay, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {render} from "./utils/render";

const init = () => {
  render(headerInfo, headerInfoComponent, Place.AFTERBEGIN);
  render(tripMenuTitle, menuComponent, Place.AFTERNODE);
  render(tripControls, filterComponent, Place.BEFOREEND);
  render(tripBoard, sortComponent, Place.BEFOREEND);
  render(tripBoard, boardComponent, Place.BEFOREEND);

  tripController.render(days);
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

const days = generateEvents(EvenOption.DAY_COUNT, generateDay);

const headerInfoComponent = new HeaderInfoComponent();
const menuComponent = new MenuComponent();
const filterComponent = new FilterComponent();
const sortComponent = new SortComponent();
const boardComponent = new BoardComponent();
const tripController = new TripController(boardComponent);

if (days.length === 0) {
  noEventInit();
} else {
  init();
}
