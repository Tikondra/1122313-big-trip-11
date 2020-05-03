import {castTimeFormat, getRandomArrayItem, getRandomIntegerNumber, makeCounter, isTrue} from "../utils/common";
import {EvenOption, CITIES, OFFERS_DESCRIPTION, Format, DESTINATION, MONTH} from "../components/consts";

const MAX_PRICE = 1000;
const MAX_PRICE_OFFERS = 300;
const MAX_OPTIONS = 6;
const MIN_OPTIONS = 1;

const dayCounter = makeCounter();
const dateCounter = makeCounter();

const getRandomStartTime = () => {
  const targetDate = new Date();

  targetDate.setHours(getRandomIntegerNumber(Format.HOURS_RANGE, Format.START_TIME));
  targetDate.setMinutes(getRandomIntegerNumber(Format.MINUTES_RANGE, Format.START_TIME));

  return targetDate;
};

const getEndTime = (startTime) => {
  const timeEnd = new Date(startTime.getTime());

  timeEnd.setHours(timeEnd.getHours() + getRandomIntegerNumber(Format.HOURS_RANGE, 1));
  timeEnd.setMinutes(getRandomIntegerNumber(Format.MINUTES_RANGE));

  return timeEnd;
};

const generateOption = () => {
  return {
    typeOptions: getRandomArrayItem(EvenOption.TYPE_TRANSPORT),
    description: getRandomArrayItem(OFFERS_DESCRIPTION),
    price: getRandomIntegerNumber(MAX_PRICE_OFFERS)
  };
};

const getRandomPicture = () => {
  const pictures = [];
  for (let i = 0; i < getRandomIntegerNumber(MAX_OPTIONS, MIN_OPTIONS); i++) {
    pictures.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return pictures;
};

const getRandomDate = () => {
  const targetDate = new Date();

  const diffValue = dateCounter() + 1;
  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateEvent = () => {
  const timeStart = getRandomStartTime();
  const timeEnd = getEndTime(timeStart);

  return {
    typeEvent: getRandomArrayItem(EvenOption.TYPE_TRANSPORT.concat(EvenOption.TYPE_ACTIVITY)),
    city: getRandomArrayItem(CITIES),
    timeStart,
    timeEnd,
    eventPrice: getRandomIntegerNumber(MAX_PRICE),
    pictures: getRandomPicture(),
    options: generateEvents(getRandomIntegerNumber(MAX_OPTIONS, MIN_OPTIONS), generateOption),
    destinations: DESTINATION.slice(getRandomIntegerNumber(DESTINATION.length)).slice(0, 5),
    isFavorite: isTrue(),
  };
};

const generateDay = () => {
  const date = getRandomDate();
  const dateTime = date.getFullYear() + `-` + castTimeFormat(date.getMonth()) + `-` + castTimeFormat(date.getDay());
  const dayNumber = date.getDate();
  const month = MONTH[date.getMonth()];

  return {
    dayCounter: dayCounter() + 1,
    dateTime,
    dayNumber,
    month
  };
};

const generateEvents = (count, object) => {
  return new Array(count)
    .fill(``)
    .map(object);
};

export {generateEvent, generateEvents, generateDay};
