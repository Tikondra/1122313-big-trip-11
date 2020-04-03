import {Place} from "./constants";

const cleanContainer = (container) => {
  container.innerHTML = ``;
};

const renderCard = (container, elem, count) => {
  for (let i = 0; i < count; i++) {
    render(container, elem, Place.BEFOREEND);
  }
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

export {cleanContainer, renderCard, render};
