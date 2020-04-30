import AbstractComponent from "./abstract-component";

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

class Day extends AbstractComponent {
  constructor(day) {
    super();

    this._day = day;
  }

  getTemplate() {
    return createEventDay(this._day);
  }
}

export default Day;
