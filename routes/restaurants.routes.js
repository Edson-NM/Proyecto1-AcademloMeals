const express = require('express');

// Controllers
const {
  createRestaurant,
  getAllActiveRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/restaurants.controllers');

// Middlewares
const {
  createRestaurantValidators,
} = require('../middlewares/validators.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');
const { adminUser } = require('../middlewares/restaurants.middlewares');
const { validateOwnerReview } = require('../middlewares/reviews.middlewares');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllActiveRestaurants);
restaurantsRouter.get('/:id', getRestaurantById);

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);
restaurantsRouter.patch('/:id', adminUser, updateRestaurant);
restaurantsRouter.delete('/:id', adminUser, deleteRestaurant);
restaurantsRouter.post('/reviews/:restaurantId', createReview);
restaurantsRouter.patch('/reviews/:id', validateOwnerReview, updateReview);
restaurantsRouter.delete('/reviews/:id', validateOwnerReview, deleteReview);

module.exports = { restaurantsRouter };
