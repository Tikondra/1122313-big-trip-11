import {createOption} from "./option-markup";

export const createOptions = (options) => {
  const optionsMarkup = options.map((it) => createOption(it)).join(`\n`);

  return (
    `<h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">
        ${optionsMarkup}
     </ul>`
  );
};
