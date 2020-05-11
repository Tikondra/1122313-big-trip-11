import AbstractComponent from "./abstract-component";

const createStatistics = ({events, dateFrom, dateTo}) => {

  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

class Statistics extends AbstractComponent {
  constructor({events, dateFrom, dateTo}) {
    super();

    this._events = events;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
  }

  getTemplate() {
    return createStatistics({events: this._events.getPoints(), dateFrom: this._dateFrom, dateTo: this._dateTo});
  }
}

export default Statistics;
