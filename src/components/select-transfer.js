import {createSelect} from "./select-markup";
import {EvenOption} from "./consts";

const getTransfers = () => EvenOption.TYPE_TRANSPORT.map((it) => createSelect(it)).join(`\n`);

export const createTransfer = () => {

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>
      ${getTransfers()}
    </fieldset>`
  );
};


