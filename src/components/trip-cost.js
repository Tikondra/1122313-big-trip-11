export const createTripCost = (points) => {
  const totalPrice = 0;
  const price = points.reduce((total, point) => {
    const totalOffersPrice = 0;
    const offersPrice = point.offers.reduce((offersPriceAll, offer) => {
      offersPriceAll += offer.price;

      return offersPriceAll;
    }, totalOffersPrice);

    total += point.basePrice + offersPrice;

    return total;
  }, totalPrice);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};
