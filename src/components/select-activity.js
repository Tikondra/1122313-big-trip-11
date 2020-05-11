import {EvenOption} from "./consts";
import {createSelect} from "./select-markup";

const getActivity = (type) => EvenOption.TYPE_ACTIVITY.map((it) => createSelect(it, it === type)).join(`\n`);

export const createActivity = (type) => {

  return (
    `<fieldset class="event__type-group">
       <legend class="visually-hidden">Activity</legend>
       ${getActivity(type)}
    </fieldset>`
  );
};
