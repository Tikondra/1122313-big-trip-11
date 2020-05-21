import {getSortByDate} from "../utils/common";
import {Format} from "./consts";
import moment from "moment";

const getTitle = (cities) => {
  const countCity = cities.length;

  if (countCity <= 3 && countCity !== 0) {
    return cities.join(` &mdash; `);
  } else if (countCity > 3) {
    return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  }

  return cities;
};

const getCities = (points) => {

  return points.reduce((cityList, point) => {
    if (!cityList.includes(point.destinations.name)) {
      cityList.push(point.destinations.name);
    }

    return cityList;
  }, []);
};

const getDate = (dates) => {
  const from = dates[0];

  if (dates.length >= 2) {
    const to = dates[dates.length - 1];

    return `${from} &mdash; ${to}`;
  } else if (dates.length === 1) {
    return `${from}`;
  }

  return ``;
};

const getDates = (points) => {

  return points.reduce((dateList, point) => {
    const date = moment(point.timeStart).format(Format.DAY_DATE);
    if (!dateList.includes(date)) {
      dateList.push(date);
    }

    return dateList;
  }, []);
};

export const createTripInfo = (points) => {
  const sortedPoints = getSortByDate(points);
  const cities = getCities(sortedPoints);
  const dates = getDates(sortedPoints);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getTitle(cities)}</h1>

      <p class="trip-info__dates">${getDate(dates)}</p>
    </div>`
  );
};
