import AbstractComponent from "./abstract-component";

const createEmptyDay = () => {

  return (
    `<li class="trip-days__item  day">
        <div class="day__info"></div>
     </li>`
  );
};

class EmptyDay extends AbstractComponent {

  getTemplate() {

    return createEmptyDay();
  }
}

export default EmptyDay;
