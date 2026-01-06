export function caloriesBurned(weightInKg, distanceInKm) {
  if (
    isNaN(weightInKg) ||
    isNaN(distanceInKm) ||
    weightInKg <= 0 ||
    distanceInKm <= 0
  ) {
    throw new Error('invalid input');
  }
  return Number((weightInKg * distanceInKm * 1.036).toFixed(2));
}
