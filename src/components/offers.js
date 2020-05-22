import {createOffer} from "./offers-item";

const getOffers = (allOffers, type, options) => allOffers.map((it, i) => createOffer(it, type, i, options)).join(`\n`);

export const createOffers = (options, type, isOffers, allOffers) => {

  return isOffers ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${getOffers(allOffers, type, options)}
        </div>
      </section>` : ``;
};
