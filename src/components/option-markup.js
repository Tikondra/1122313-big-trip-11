export const createOption = (option) => {
  const {description, price} = option;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${description}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
     </li>`
  );
};
