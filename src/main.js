import HeaderInfoComponent from "./components/header-info";
import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import BoardComponent from "./components/board";
import NoEventComponent from "./components/no-event";
import TripController from "./controllers/tripControllers";

import {generateEvent, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {render} from "./utils/render";

const init = () => {
  render(headerInfo, headerInfoComponent, Place.AFTERBEGIN);
  render(tripMenuTitle, menuComponent, Place.AFTERNODE);
  render(tripControls, filterComponent, Place.BEFOREEND);

  if (events.length === 0) {
    render(tripBoard, new NoEventComponent(), Place.AFTERBEGIN);
  } else {
    render(tripBoard, boardComponent, Place.BEFOREEND);

    tripController.render(events);
  }
};

const headerInfo = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripMenuTitle = tripControls.querySelector(`h2`);
const tripBoard = document.querySelector(`.trip-events`);

const events = generateEvents(EvenOption.COUNT, generateEvent);

const headerInfoComponent = new HeaderInfoComponent();
const menuComponent = new MenuComponent();
const filterComponent = new FilterComponent();
const boardComponent = new BoardComponent();
const tripController = new TripController(boardComponent);

init();
