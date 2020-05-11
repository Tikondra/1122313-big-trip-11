import HeaderInfoComponent from "./components/header-info";
import MenuComponent from "./components/menu";
import BoardComponent from "./components/board";
import StatisticsComponent from "./components/statistics";
import TripController from "./controllers/tripControllers";
import FilterController from "./controllers/filter-controller";
import PointsModel from "./models/points";

import {generateEvent, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {render} from "./utils/render";
import {getDateFrom} from "./utils/common";

const getStateTable = (tripController, statisticsComponent) => {
  statisticsComponent.hide();
  tripController.show();
};

const getStateStats = (tripController, statisticsComponent) => {
  statisticsComponent.show();
  tripController.hide();
};

const menuSwitch = (menuItem) => {
  return menuState[menuItem](tripController, statisticsComponent);
};

const init = () => {
  render(headerInfo, headerInfoComponent, Place.AFTERBEGIN);
  render(tripMenuTitle, menuComponent, Place.AFTERNODE);

  filterController.render();

  render(tripBoard, boardComponent, Place.BEFOREEND);

  tripController.render();

  render(tripBoard, statisticsComponent, Place.AFTERNODE);

  statisticsComponent.hide();
  menuComponent.setOnChange(menuSwitch);
};

const headerInfo = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripMenuTitle = tripControls.querySelector(`h2`);
const tripBoard = document.querySelector(`.trip-events`);

const headerInfoComponent = new HeaderInfoComponent();
const menuComponent = new MenuComponent();
const boardComponent = new BoardComponent();
const pointsModel = new PointsModel();
const tripController = new TripController(boardComponent, pointsModel, menuComponent);
const filterController = new FilterController(tripControls, pointsModel);

const events = generateEvents(EvenOption.COUNT, generateEvent);
const menuState = {
  table: getStateTable,
  stats: getStateStats,
};
const dateTo = new Date();
const dateFrom = getDateFrom(dateTo);

const statisticsComponent = new StatisticsComponent({events: pointsModel, dateFrom, dateTo});

pointsModel.setPoints(events);

init();
