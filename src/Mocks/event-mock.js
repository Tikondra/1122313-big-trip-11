import {getRandomArrayItem, getRandomIntegerNumber} from "../components/utils";
import {TYPE_EVENT_TRANSPORT, TYPE_EVENT, CITIES, OFFERS_DESCRIPTION, RANDOM_PIC, HOURS_RANGE, START_TIME, MINUTES_RANGE} from "../components/consts";

const MAX_PRICE = 1000;
const MAX_PRICE_OFFERS = 300;
const MAX_OPTIONS = 5;
const MIN_OPTIONS = 1;

const getRandomStartTime = () => {
  const targetDate = new Date();

  targetDate.setHours(getRandomIntegerNumber(HOURS_RANGE, START_TIME));
  targetDate.setMinutes(getRandomIntegerNumber(MINUTES_RANGE, START_TIME));

  return targetDate;
};

const getEndTime = (startTime) => {
  const timeEnd = new Date(startTime.getTime());

  timeEnd.setHours(timeEnd.getHours() + getRandomIntegerNumber(HOURS_RANGE, 1));
  timeEnd.setMinutes(getRandomIntegerNumber(MINUTES_RANGE));

  return timeEnd;
};

const generateOption = () => {
  return {
    typeOptions: getRandomArrayItem(TYPE_EVENT_TRANSPORT),
    description: getRandomArrayItem(OFFERS_DESCRIPTION),
    price: getRandomIntegerNumber(MAX_PRICE_OFFERS)
  };
};

const generateEvent = () => {
  const timeStart = getRandomStartTime();
  const timeEnd = getEndTime(timeStart);

  return {
    typeEvent: getRandomArrayItem(TYPE_EVENT_TRANSPORT.concat(TYPE_EVENT)),
    city: getRandomArrayItem(CITIES),
    timeStart,
    timeEnd,
    eventPrice: getRandomIntegerNumber(MAX_PRICE),
    picture: RANDOM_PIC,
    options: generateEvents(getRandomIntegerNumber(MAX_OPTIONS, MIN_OPTIONS), generateOption)
  };
};

const generateEvents = (count, object) => {
  return new Array(count)
    .fill(``)
    .map(object);
};

export {generateEvent, generateEvents};
