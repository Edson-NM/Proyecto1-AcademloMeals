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
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/users', restaurantsRouter);
app.use('/api/v1/users', mealsRouter);
app.use('/api/v1/users', ordersRouter);

app.all('*', (req, res) => {
  res.status().json({
    status: 'error',
    message: `${req.method} ${req.url} does not exist in our server`,
  });
});

module.exports = { app };
