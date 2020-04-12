import {TYPE_EVENT} from "./consts";
import {createSelect} from "./select-markup";

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
