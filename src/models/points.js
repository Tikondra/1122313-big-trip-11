import {FilterType} from "../components/consts";
import {getPointsByFilter} from "../utils/filter";

class Points {
  constructor() {
    this._points = [];
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getPointsAll() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);
    const from = this._points.slice(0, index);
    const to = this._points.slice(index + 1);

    if (index === -1) {
      return false;
    }

    this._points = [...from, point, ...to];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export default Points;
