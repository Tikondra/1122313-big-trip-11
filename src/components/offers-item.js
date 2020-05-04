export const createOffer = (option, type, i) => {
  const {title, price} = option;

  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="${type}-${i}"
        type="checkbox"
        name="event-offer-${type}">
      <label class="event__offer-label" for="${type}-${i}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};
