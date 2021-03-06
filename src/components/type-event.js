export const createTypeEvent = (typeEvent, city) => {
  const imgEvent = typeEvent.toLowerCase();
  const type = `${typeEvent[0].toUpperCase()}${typeEvent.slice(1)}`;

  return (
    `<div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${imgEvent}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} to ${city}</h3>`
  );
};
