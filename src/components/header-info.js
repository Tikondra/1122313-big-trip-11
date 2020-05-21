import {createTripInfo} from "./trip-info";
import {createTripCost} from "./trip-cost";
import AbstractComponent from "./abstract-component";
import {getSortByDate} from "../utils/common";

const getCities = (points) => {
  const sortedPoints = getSortByDate(points);

  return sortedPoints.reduce((cityList, point) => {
    if (!cityList.includes(point.destinations.name)) {
      cityList.push(point.destinations.name);
    }

    return cityList;
  }, []);
};

const createHeaderInfo = (points) => {
  const cities = getCities(points);

  return (
    `<section class="trip-main__trip-info  trip-info">
            ${createTripInfo(cities)}
            ${createTripCost()}
     </section>`
  );
};

class HeaderInfo extends AbstractComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;
  }

  getTemplate() {

    return createHeaderInfo(this._pointsModel.getPoints());
  }
}

export default HeaderInfo;
