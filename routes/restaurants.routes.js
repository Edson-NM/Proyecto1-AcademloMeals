const express = require('express');

// Controllers
const {
  createRestaurant,
  getAllActiveRestaurants,
  getRestaurantById,
} = require('../controllers/restaurants.controllers');

// Middlewares
const {
  createRestaurantValidators,
} = require('../middlewares/validators.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllActiveRestaurants);
restaurantsRouter.get('/:id', getRestaurantById);

// restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);
restaurantsRouter.patch('/:id');
restaurantsRouter.delete('/:id');
restaurantsRouter.post('/reviews/:restaurantId');
restaurantsRouter.patch('/reviews/:id');
restaurantsRouter.delete('/reviews/:id');

module.exports = { restaurantsRouter };
