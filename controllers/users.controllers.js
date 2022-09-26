// bcryptjs
const bcrypt = require('bcryptjs');

// JWT
const jwt = require('jsonwebtoken');

// dotenv
const dotenv = require('dotenv');

// Models
const { User } = require('../models/users.model');
const { Restaurant } = require('../models/restaurants.model');
const { Order } = require('../models/orders.model');

dotenv.config({ path: './' });

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Encrypt password
    const salt = await bcrypt.genSalt(12);
    const hashedSalt = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedSalt,
      role,
    });

    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (req, res) => {
  try {
    // Get email and password
    const { email, password } = req.body;

    // Validate if user exists with given email
    const user = await User.findOne({ where: { email, status: 'active' } });

    // If user doesnt exist or password doesnt match send error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    // Remove password from response
    user.password = undefined;

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: 'disabled' });

    res.status(201).json({
      status: 'success',
      message: 'User has been successfully removed',
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { user } = req;

    const orders = await Order.findAll({ where: { userId: user.id } });

    res.status(200).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const getOrderDetail = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderDetail,
};
