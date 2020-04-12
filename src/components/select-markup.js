export const createSelect = (type) => {
  const typeLowerCase = type.toLowerCase();

  return (
    `<div class="event__type-item">
       <input
        id="event-type-${typeLowerCase}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${typeLowerCase}">
       <label class="event__type-label  event__type-label--${typeLowerCase}" for="event-type-${typeLowerCase}-1">${type}</label>
     </div>`
  );
};
