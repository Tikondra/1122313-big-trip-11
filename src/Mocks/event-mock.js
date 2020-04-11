import {getRandomArrayItem, getRandomIntegerNumber} from "../components/utils";
import {TIP_EVENT, CITIES, TEXT, RANDOM_PIC, HOURS_RANGE, START_TIME, MINUTES_RANGE} from "../components/consts";

const MAX_PRICE = 50;

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

const generateEvent = () => {
  const timeStart = getRandomStartTime();
  const timeEnd = getEndTime(timeStart);

  return {
    tipEvent: getRandomArrayItem(TIP_EVENT),
    city: getRandomArrayItem(CITIES),
    timeStart,
    timeEnd,
    options: {
      tipOptions: getRandomArrayItem(TIP_EVENT),
      description: getRandomArrayItem(TEXT),
      price: getRandomIntegerNumber(MAX_PRICE)
    },
    picture: RANDOM_PIC
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
