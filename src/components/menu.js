import AbstractComponent from "./abstract-component";

const createMenu = () => {

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="table">Table</a>
       <a class="trip-tabs__btn" href="#" id="stats">Stats</a>
     </nav>`
  );
};

class Menu extends AbstractComponent {
  getTemplate() {

    return createMenu();
  }

  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item) {
      item.checked = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}

export default Menu;
