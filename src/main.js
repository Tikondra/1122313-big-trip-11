import {createHeaderInfo} from "./components/header-info";
import {createBoard} from "./components/board";

import {generateEvent, generateEvents} from "./Mocks/event-mock";

import {EvenOption, Place} from "./components/consts";

import {cleanContainer, render} from "./components/utils";


const headerInfo = document.querySelector(`.trip-main`);
const tripBoard = document.querySelector(`.trip-events`);

const events = generateEvents(EvenOption.COUNT, generateEvent);

const init = () => {
  cleanContainer(headerInfo);
  render(headerInfo, createHeaderInfo(), Place.AFTERBEGIN);

  cleanContainer(tripBoard);
  render(tripBoard, createBoard(events), Place.BEFOREEND);
};

init();
