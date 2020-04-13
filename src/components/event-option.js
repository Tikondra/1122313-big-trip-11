import {createOption} from "./option-markup";

const getOptions = (options) => options.slice(0, 3).map((it) => createOption(it)).join(`\n`);

export const createOptions = (options) => {

  return (
    `<h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">
        ${getOptions(options)}
     </ul>`
  );
};
