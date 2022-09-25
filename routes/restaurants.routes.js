const express = require('express');

// Controllers

const restaurantsRouter = express.Router();

restaurantsRouter.post('/');
restaurantsRouter.get('/');
restaurantsRouter.get('/:id');
restaurantsRouter.patch('/:id');
restaurantsRouter.delete('/:id');
restaurantsRouter.post('/reviews/:restaurantId');
restaurantsRouter.patch('/reviews/:id');
restaurantsRouter.delete('/reviews/:id');

module.exports = { restaurantsRouter };
