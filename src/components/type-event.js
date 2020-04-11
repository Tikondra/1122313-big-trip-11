export const createTypeEvent = (typeEvent, city, imgEvent) => {
  return (
    `<div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${imgEvent}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${typeEvent} to ${city}</h3>`
  );
};
