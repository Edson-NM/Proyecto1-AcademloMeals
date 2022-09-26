const express = require('express');

// Controllers

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');

const mealsRouter = express.Router();

mealsRouter.get('/');
mealsRouter.get('/:id');

// mealsRouter.use(protectSession)

mealsRouter.post('/:id');
mealsRouter.patch('/:id');
mealsRouter.delete('/:id');

module.exports = { mealsRouter };
