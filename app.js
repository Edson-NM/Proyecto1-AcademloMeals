const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');

const app = express();

// Enable JSON Data
app.use(express.json());

// Endpoints
app.use('/api/V1/users', usersRouter);
app.use('/api/V1/restaurants', restaurantsRouter);
app.use('/api/V1/meals', mealsRouter);
app.use('/api/V1/orders', ordersRouter);

app.all('*', (req, res) => {
  res.status().json({
    status: 'error',
    message: `${req.method} ${req.url} does not exist in our server`,
  });
});

module.exports = { app };
