const express = require('express');

// Controllers
const {
  GetAllMeals,
  GetOneMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controllers');

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const { adminUser } = require('../middlewares/restaurants.middlewares');

const mealsRouter = express.Router();

mealsRouter.get('/', GetAllMeals);
mealsRouter.get('/:id', GetOneMeal);

mealsRouter.use(protectSession);

mealsRouter.post('/:id', createMeal);
mealsRouter.patch('/:id', adminUser, updateMeal);
mealsRouter.delete('/:id', adminUser, deleteMeal);

module.exports = { mealsRouter };
