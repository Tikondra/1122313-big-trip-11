import API from "./api/index";
import Provider from "./api/provider";
import Store from "./api/store";
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

  apiWithProvider.getOffers()
    .then((offers) => pointsModel.setOffers(offers));

  apiWithProvider.getDestinations()
    .then((destinations) => pointsModel.setDestinations(destinations));

  apiWithProvider.getPoints()
    .then((points) => {
      pointsModel.setPoints(points);
      tripController.render();
    });

  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`./sw.js`);
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
const api = new API(ApiOption.END_POINT, ApiOption.AUTHORIZATION);
const store = new Store(ApiOption.STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const tripController = new TripController(boardComponent, pointsModel, menuComponent, apiWithProvider);
const filterController = new FilterController(tripControls, pointsModel);
const statisticsComponent = new StatisticsComponent(pointsModel);

init();
