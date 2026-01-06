import test, { describe, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { kmToMeters } from './distanceUtils.js';
import { caloriesBurned } from './calories.js';
import { app } from '../app.js';

describe('kmToMeters', () => {
  test('kmToMeters converts kilometers to meters', () => {
    assert.strictEqual(kmToMeters(1), 1000);
    assert.strictEqual(kmToMeters(0), 0);
    assert.strictEqual(kmToMeters(2.5), 2500);
  });
  test('kmToMeters throws error for negative input', () => {
    assert.throws(() => kmToMeters(-1));
  });
  test('kmToMeters throws error for non-numeric input', () => {
    assert.throws(() => kmToMeters('a string'));
    assert.throws(() => kmToMeters(null));
    assert.throws(() => kmToMeters(undefined));
  });
});

describe('caloriesBurned', () => {
  test('caloriesBurned calcul estimated calories burned', () => {
    assert.strictEqual(caloriesBurned(70, 5), 362.6);
  });
  test('caloriesBurned throws error for non-positive weight', () => {
    assert.throws(() => caloriesBurned(0, 5));
    assert.throws(() => caloriesBurned(-70, 5));
  });
  test('caloriesBurned calcul estimated calories burned with decimal distance', () => {
    assert.strictEqual(caloriesBurned(70, 3.5), 253.82);
  });
});
let server;
before(() => {
  server = app.listen(3000);
});

after(async () => {
  await server.close();
});

test('test on check endpoint', async () => {
  assert.deepEqual(
    await fetch('http://localhost:3000/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temperature: 23,
        windSpeed: 50,
      }),
    }).then((data) => data.json()),
    {
      safe: true,
      message: 'All conditions are good for hiking!',
    }
  );
});
