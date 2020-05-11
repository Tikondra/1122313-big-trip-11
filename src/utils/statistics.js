import {getDurationMinutes} from "./common";
import {Format} from "../components/consts";

const getMoneyByType = (type, events) => {
  let total = 0;

  events.forEach((event) => {
    if (event.type === type) {
      total += event.basePrice;
    }
  });

  return total;
};

const getCountByType = (type, events) => {
  let total = 0;

  events.forEach((event) => {
    if (event.type === type) {
      total++;
    }
  });

  return total;
};

const getDurationByType = (type, events) => {
  let total = 0;

  events.forEach((event) => {
    if (event.type === type) {
      total += getDurationMinutes(event.timeStart, event.timeEnd);
    }
  });

  return Math.floor(total / Format.IN_HOUR);
};

export const getMoneyByTypes = (types, events) => {
  return types.map((type) => getMoneyByType(type, events));
};

export const getCountByTypes = (types, events) => {
  return types.map((type) => getCountByType(type, events));
};

export const getDurationByTypes = (types, events) => {
  return types.map((type) => getDurationByType(type, events));
};
