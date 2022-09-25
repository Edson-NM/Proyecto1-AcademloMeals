const express = require('express');

// Controllers
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderDetail,
} = require('../controllers/users.controllers');

const usersRouter = express.Router();

usersRouter.post('/signup', createUser);
usersRouter.post('/login', loginUser);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.get('/orders', getAllOrders);
usersRouter.get('/orders/:id', getOrderDetail);

module.exports = { usersRouter };
