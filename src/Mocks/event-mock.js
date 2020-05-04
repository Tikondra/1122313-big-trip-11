import {
  castTimeFormat,
  getRandomArrayItem,
  getRandomIntegerNumber,
  makeCounter,
  isTrue,
  shuffle
} from "../utils/common";
import {EvenOption, CITIES, OFFERS_DESCRIPTION, Format, DESTINATION, MONTH} from "../components/consts";

const MAX_PRICE = 1000;
const MAX_PRICE_OFFERS = 300;
const MAX_OPTIONS = 6;
const MIN_OPTIONS = 1;
const RANDOM_PIC = `http://picsum.photos/248/152?r=`;

const dayCounter = makeCounter();
const dateCounter = makeCounter();
const id = makeCounter();

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

const getRandomPicture = () => {
  const pictures = [];
  for (let i = 0; i < getRandomIntegerNumber(MAX_OPTIONS, MIN_OPTIONS); i++) {
    const picturesInfo = {
      src: RANDOM_PIC + `${Math.random()}`,
      description: getRandomArrayItem(DESTINATION)
    };

    pictures.push(picturesInfo);
  }

  return pictures;
};

const getRandomOffers = () => {
  const offers = [];
  for (let i = 0; i < getRandomIntegerNumber(MAX_OPTIONS, MIN_OPTIONS); i++) {
    const offersInfo = {
      title: getRandomArrayItem(OFFERS_DESCRIPTION),
      price: getRandomIntegerNumber(MAX_PRICE_OFFERS)
    };

    offers.push(offersInfo);
  }

  return offers;
};

const getDescription = () => {
  return shuffle(DESTINATION).slice(0, getRandomIntegerNumber(MAX_OPTIONS, MIN_OPTIONS)).join(` `);
};

const getRandomDate = () => {
  const targetDate = new Date();

  const diffValue = dateCounter() + 1;
  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getDestination = (destinationList, name) => {
  const destination = {
    description: getDescription(),
    name,
    pictures: getRandomPicture(),
  };
  destinationList.push(destination);

  return destinationList;
};

const generateDestinations = () => {
  return CITIES.reduce(getDestination, []);
};

export const getDestinationForCity = (city) => {
  const destinations = generateDestinations();
  const currentDestination = destinations.filter((it) => it.name === city);

  return currentDestination[0];
};

const getOffer = (offersList, type) => {
  const offer = {
    type,
    offers: getRandomOffers()
  };
  offersList.push(offer);

  return offersList;
};

const generateOffer = () => {
  return EvenOption.TYPE_TRANSPORT.concat(EvenOption.TYPE_ACTIVITY).reduce(getOffer, []);
};

export const getOffersForType = (type) => {
  const typeOffers = generateOffer();
  const currentOffers = typeOffers.filter((it) => it.type === type);

  return currentOffers[0].offers;
};

const generateEvent = () => {
  const timeStart = getRandomStartTime();
  const timeEnd = getEndTime(timeStart);
  const type = getRandomArrayItem(EvenOption.TYPE_TRANSPORT.concat(EvenOption.TYPE_ACTIVITY));
  const cityDestination = getRandomArrayItem(CITIES);

  return {
    basePrice: getRandomIntegerNumber(MAX_PRICE),
    timeStart,
    timeEnd,
    destinations: getDestinationForCity(cityDestination),
    id: id() + 1,
    isFavorite: isTrue(),
    offers: getOffersForType(type),
    type,
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
