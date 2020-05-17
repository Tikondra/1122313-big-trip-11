import {createSelect} from "./select-markup";
import {EvenOption} from "./consts";
import {toNormalCase} from "../utils/common";

const getTransfers = (type) => EvenOption.TYPE_TRANSPORT.map((it) => createSelect(it, it === type)).join(`\n`);

export const createTransfer = (type) => {
  const typeEvent = toNormalCase(type);

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>
      ${getTransfers(typeEvent)}
    </fieldset>`
  );
};


