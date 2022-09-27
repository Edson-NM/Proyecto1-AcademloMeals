const express = require('express');

// Controllers
const {
  createOrder,
  getMealsByOrder,
  completeOrder,
  cancelOrder,
} = require('../controllers/orders.controllers');

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const { validateStatusOrder } = require('../middlewares/orders.middlewares');

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post('/', createOrder);
ordersRouter.get('/me', getMealsByOrder);
ordersRouter.patch('/:id', validateStatusOrder, completeOrder);
ordersRouter.delete('/:id', validateStatusOrder, cancelOrder);

module.exports = { ordersRouter };
