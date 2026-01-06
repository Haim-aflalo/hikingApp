export function kmToMeters(num) {
  if (typeof num !== 'number' || num < 0) {
    throw new Error('invalid input');
  }
  return Number(num * 1000).toFixed(2);
}
