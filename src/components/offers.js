import {createOffer} from "./offers-item";

export const createOffers = (options) => {
  const offers = options
    .map((it) => createOffer(it))
    .join(`\n`);

  return (
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offers}
        </div>
      </section>`
  );
};
