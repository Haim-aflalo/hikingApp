import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

app.post('/check', (req, res) => {
  const { temperature, windSpeed } = req.body;
  let safe = true;
  if (typeof temperature !== 'number' || typeof windSpeed !== 'number') {
    throw new Error('invalid input');
  }
  if (temperature < 0 || temperature > 35 || windSpeed > 50) {
    safe = false;
  }
  safe
    ? res.json({
        safe: safe,
        message: 'All conditions are good for hiking!',
      })
    : res.json({
        safe: safe,
        message: 'Too windy to hike!',
      });
});


// app.listen(port, () => {
//   console.log('server run on port:', port);
// });


export {
    app
}