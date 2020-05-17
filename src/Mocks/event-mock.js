import {
  getRandomArrayItem,
  getRandomIntegerNumber,
  makeCounter
} from "../utils/common";
import {EvenOption, OFFERS_DESCRIPTION, Format} from "../components/consts";
import moment from "moment";

const MAX_PRICE_OFFERS = 300;
const MAX_OPTIONS = 6;
const MIN_OPTIONS = 1;

const dayCounter = makeCounter();

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

export const getDays = (events) => {
  const dayDates = [];
  const days = [];
  const sortedEvents = events.sort((current, previous) => current.timeStart - previous.timeStart);
  dayCounter.currentCount = 0;

  sortedEvents.map((event) => {
    if (!dayDates.includes(moment(event.timeStart).format(Format.DAY_DATE))) {
      dayDates.push(moment(event.timeStart).format(Format.DAY_DATE));
      days.push(generateDay(event.timeStart));
    }
  });

  return days;
};

const generateDay = (date) => {
  const dateTime = moment(date).format(Format.DATE_TIME);
  const dayDate = moment(date).format(Format.DAY_DATE);

  return {
    dayCounter: dayCounter() + 1,
    dateTime,
    dayDate
  };
};

export {generateDay};
