import AbstractComponent from "./abstract-component";

const createFilterButton = (filter, isChecked) => {
  const {name} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createFilter = (filters) => {
  const filtersMarkup = filters.map((filter, i) => createFilterButton(filter, i === 0)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersMarkup}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilter(this._filters);
  }
}

export default Filter;
