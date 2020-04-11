export const createTimeEvent = (date, startTime, endTime, duration) => {
  return (
    `<div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${date}T${startTime}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${date}T${endTime}">${endTime}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>`
  );
};
