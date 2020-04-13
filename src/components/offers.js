import {createOffer} from "./offers-item";

const getOffers = (options) => options.map((it, i) => createOffer(it, i)).join(`\n`);

export const createOffers = (options) => {

  return (
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${getOffers(options)}
        </div>
      </section>`
  );
};
