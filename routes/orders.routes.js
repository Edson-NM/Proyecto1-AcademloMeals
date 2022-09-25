const express = require('express');

// Controllers

const ordersRouter = express.Router();

ordersRouter.post('/');
ordersRouter.get('/me');
ordersRouter.patch('/:id');
ordersRouter.delete('/:id');

module.exports = { ordersRouter };
