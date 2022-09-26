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

const mealsRouter = express.Router();

mealsRouter.get('/', GetAllMeals);
mealsRouter.get('/:id', GetOneMeal);

mealsRouter.use(protectSession);

mealsRouter.post('/:id', createMeal);
mealsRouter.patch('/:id', updateMeal);
mealsRouter.delete('/:id', deleteMeal);

module.exports = { mealsRouter };
