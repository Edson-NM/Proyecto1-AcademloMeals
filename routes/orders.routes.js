const express = require('express');

// Controllers

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');

const ordersRouter = express.Router();

// ordersRouter.use(protectSession);

ordersRouter.post('/');
ordersRouter.get('/me');
ordersRouter.patch('/:id');
ordersRouter.delete('/:id');

module.exports = { ordersRouter };
