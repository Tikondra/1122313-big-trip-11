export const createOffer = (option, type, i, options) => {
  const {title, price} = option;
  const allOptions = options.map((offer) => offer.title);

  const isChecked = allOptions.includes(title) ? `checked` : ``;

  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="${type}-${i}"
        type="checkbox"
        name="event-offer-${type}"
        value="${title}"
        ${isChecked}>
      <label class="event__offer-label" for="${type}-${i}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};
