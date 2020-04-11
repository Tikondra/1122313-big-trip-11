import {createSelect} from "./type-select-markup";
import {TYPE_EVENT, TYPE_EVENT_TRANSPORT} from "./consts";

export const createTransfer = () => {
  const transferMarkup = TYPE_EVENT_TRANSPORT
    .map((it) => createSelect(it))
    .join(`\n`);

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>
      ${transferMarkup}
    </fieldset>`
  );
};

export const createActivity = () => {
  const activityMarkup = TYPE_EVENT
    .map((it) => createSelect(it))
    .join(`\n`);

  return (
    `<fieldset class="event__type-group">
       <legend class="visually-hidden">Activity</legend>
       ${activityMarkup}
    </fieldset>`
  );
};
