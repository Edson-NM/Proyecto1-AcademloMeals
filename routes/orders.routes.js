const express = require('express');

// Controllers
const { createOrder } = require('../controllers/orders.controllers');

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');

const ordersRouter = express.Router();

// ordersRouter.use(protectSession);

ordersRouter.post('/', createOrder);
ordersRouter.get('/me');
ordersRouter.patch('/:id');
ordersRouter.delete('/:id');

module.exports = { ordersRouter };
