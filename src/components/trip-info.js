const getTitle = (cities) => {
  const countCity = cities.length;

  if (countCity <= 3 && countCity !== 0) {
    return cities.join(` &mdash; `);
  } else if (countCity > 3) {
    return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  }

  return cities;
};

export const createTripInfo = (cities) => {

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getTitle(cities)}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`
  );
};
