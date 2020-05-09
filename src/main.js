import HeaderInfoComponent from "./components/header-info";
import MenuComponent from "./components/menu";
import BoardComponent from "./components/board";
import NoEventComponent from "./components/no-event";
import TripController from "./controllers/tripControllers";
import FilterController from "./controllers/filter-controller";
import PointsModel from "./models/points";

import {generateEvent, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {render} from "./utils/render";

const init = () => {
  render(headerInfo, headerInfoComponent, Place.AFTERBEGIN);
  render(tripMenuTitle, menuComponent, Place.AFTERNODE);
  filterController.render();

  if (events.length === 0) {
    render(tripBoard, new NoEventComponent(), Place.AFTERBEGIN);
  } else {
    render(tripBoard, boardComponent, Place.BEFOREEND);

    tripController.render();
  }
};

const headerInfo = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripMenuTitle = tripControls.querySelector(`h2`);
const tripBoard = document.querySelector(`.trip-events`);

const headerInfoComponent = new HeaderInfoComponent();
const menuComponent = new MenuComponent();
const boardComponent = new BoardComponent();
const pointsModel = new PointsModel();
const tripController = new TripController(boardComponent, pointsModel);
const filterController = new FilterController(tripControls, pointsModel);

const events = generateEvents(EvenOption.COUNT, generateEvent);

pointsModel.setPoints(events);

init();
