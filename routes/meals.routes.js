const express = require('express');

// Controllers

const mealsRouter = express.Router();

mealsRouter.post('/:id');
mealsRouter.get('/');
mealsRouter.get('/:id');
mealsRouter.patch('/:id');
mealsRouter.delete('/:id');

module.exports = { mealsRouter };
