import API from "./api";
import HeaderInfoComponent from "./components/header-info";
import MenuComponent from "./components/menu";
import BoardComponent from "./components/board";
import StatisticsComponent from "./components/statistics";
import TripController from "./controllers/tripControllers";
import FilterController from "./controllers/filter-controller";
import PointsModel from "./models/points";

import {Place, ApiOption} from "./components/consts";

import {render} from "./utils/render";

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
  render(tripBoard, statisticsComponent, Place.AFTERNODE);

  statisticsComponent.hide();
  menuComponent.setOnChange(menuSwitch);

  api.getOffers()
    .then((offers) => pointsModel.setOffers(offers));

  api.getDestinations()
    .then((destinations) => pointsModel.setDestinations(destinations));

  api.getPoints()
    .then((points) => {
      pointsModel.setPoints(points);
      tripController.render();
    });
};

const headerInfo = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);
const tripMenuTitle = tripControls.querySelector(`h2`);
const tripBoard = document.querySelector(`.trip-events`);
const menuState = {
  table: getStateTable,
  stats: getStateStats,
};

const headerInfoComponent = new HeaderInfoComponent();
const menuComponent = new MenuComponent();
const boardComponent = new BoardComponent();
const pointsModel = new PointsModel();
const tripController = new TripController(boardComponent, pointsModel, menuComponent);
const filterController = new FilterController(tripControls, pointsModel);
const statisticsComponent = new StatisticsComponent(pointsModel);
const api = new API(ApiOption.END_POINT, ApiOption.AUTHORIZATION);

init();
