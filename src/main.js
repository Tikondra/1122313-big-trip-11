'use strict';

const Place = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const tripInfoContainer = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-controls`);

const creatTripInfo = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
    </section>`
  );
};

const createTripCost = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

const createMenu = () => {
  tripControls.innerHTML = ``;
  return (
    `<h2 class="visually-hidden">Switch trip view</h2>
     <nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
       <a class="trip-tabs__btn" href="#">Stats</a>
     </nav>`
  );
};

const createFilter = () => {
  return (
    `<h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

const init = () => {
  render(tripInfoContainer, creatTripInfo(), Place.AFTERBEGIN);

  const tripInfo = tripInfoContainer.querySelector(`.trip-info`);

  render(tripInfo, createTripCost(), Place.BEFOREEND);

  render(tripControls, createMenu(), Place.AFTERBEGIN);

  render(tripControls, createFilter(), Place.BEFOREEND);
};

init();
