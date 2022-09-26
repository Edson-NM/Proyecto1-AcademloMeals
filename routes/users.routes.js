const express = require('express');

// Controllers
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderDetail,
  getAllUsers,
} = require('../controllers/users.controllers');

// Middlewares
const { userExist } = require('../middlewares/users.middleswares');
const {
  createUserValidators,
} = require('../middlewares/validators.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);
usersRouter.post('/login', loginUser);

usersRouter.use(protectSession);

usersRouter.patch('/:id', userExist, updateUser);
usersRouter.delete('/:id', userExist, deleteUser);
usersRouter.get('/orders', getAllOrders);
usersRouter.get('/orders/:id', getOrderDetail);

module.exports = { usersRouter };
