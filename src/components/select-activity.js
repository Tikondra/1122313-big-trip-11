import {EvenOption} from "./consts";
import {createSelect} from "./select-markup";

const getActivity = () => EvenOption.TYPE_ACTIVITY.map((it) => createSelect(it)).join(`\n`);

export const createActivity = () => {

  return (
    `<fieldset class="event__type-group">
       <legend class="visually-hidden">Activity</legend>
       ${getActivity()}
    </fieldset>`
  );
};
