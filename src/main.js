import API from "./api/api";
import Provider from "./api/provider";
import Store from "./api/store";
import HeaderInfoComponent from "./components/header-info";
import MenuComponent from "./components/menu";
import BoardComponent from "./components/board";
import StatisticsComponent from "./components/statistics";
import TripController from "./controllers/tripControllers";
import FilterController from "./controllers/filter-controller";
import PointsModel from "./models/points";

import {Place, ApiOption, MenuItem} from "./components/consts";

import {render} from "./utils/render";

const getStateTable = (tripController, statisticsComponent) => {
  pointsModel.setActivePage(MenuItem.TABLE);
  filterController.setDefaultFilterType();
  statisticsComponent.hide();
  tripController.show();
};

const getStateStats = (tripController, statisticsComponent) => {
  pointsModel.setActivePage(MenuItem.STATS);
  filterController.setDefaultFilterType();
  statisticsComponent.show();
  tripController.hide();
};

const menuSwitch = (menuItem) => {
  return menuState[menuItem](tripController, statisticsComponent);
};

const load = (offers, destinations, points) => {
  pointsModel.setOffers(offers);
  pointsModel.setDestinations(destinations);
  pointsModel.setPoints(points);

  render(headerInfo, headerInfoComponent, Place.AFTERBEGIN);
  tripController.render();
};

const init = () => {
  render(tripMenuTitle, menuComponent, Place.AFTERNODE);

  filterController.render();

  render(tripBoard, boardComponent, Place.BEFOREEND);
  render(tripBoard, statisticsComponent, Place.AFTERNODE);

  statisticsComponent.hide();
  menuComponent.setOnChange(menuSwitch);

  Promise.all([apiWithProvider.getOffers(), apiWithProvider.getDestinations(), apiWithProvider.getPoints()])
    .then(([offers, destinations, points]) => load(offers, destinations, points));

  window.addEventListener(`online`, () => {
    document.title = document.title.replace(` [offline]`, ``);

    apiWithProvider.sync();
  });

  window.addEventListener(`offline`, () => {
    document.title += ` [offline]`;
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

const menuComponent = new MenuComponent();
const boardComponent = new BoardComponent();
const pointsModel = new PointsModel();
const headerInfoComponent = new HeaderInfoComponent(pointsModel);
const api = new API(ApiOption.END_POINT, ApiOption.AUTHORIZATION);
const store = new Store(ApiOption.STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const statisticsComponent = new StatisticsComponent(pointsModel);
const filterController = new FilterController(tripControls, pointsModel);
const tripController = new TripController(
    boardComponent,
    pointsModel,
    menuComponent,
    apiWithProvider,
    statisticsComponent,
    filterController,
    headerInfoComponent
);

init();
