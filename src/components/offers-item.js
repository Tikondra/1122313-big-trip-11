export const createOffer = (option, i) => {
  const {description, price, typeOptions} = option;

  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="${typeOptions}-${i}"
        type="checkbox"
        name="event-offer-${typeOptions}">
      <label class="event__offer-label" for="${typeOptions}-${i}">
        <span class="event__offer-title">${description}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};
