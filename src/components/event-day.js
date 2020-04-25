import {createElement} from "../utils/render";

const createEventDay = (day) => {
  const {dayCounter, dateTime, dayNumber, month} = day;

  return (
    `<li class="trip-days__item  day" id="day${dayCounter}">
        <div class="day__info">
          <span class="day__counter">${dayCounter}</span>
          <time class="day__date" datetime="${dateTime}">${month} ${dayNumber}</time>
        </div>
     </li>`
  );
};

class Day {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getTemplate() {

    return createEventDay(this._day);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Day;
