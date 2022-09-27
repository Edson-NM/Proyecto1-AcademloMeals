// Models
const { Order } = require('../models/orders.model');
const { Meal } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');

const createOrder = async (req, res) => {
  try {
    const { quantity, mealId } = req.body;
    const { userIdToken } = req;

    const meal = await Meal.findOne({ where: { id: mealId } });

    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: 'meal doesnt found with given ID. Choose another option',
      });
    }

    const totalPrice = quantity * meal.price;

    const order = await Order.create({
      quantity,
      mealId,
      totalPrice,
      userId: userIdToken,
    });

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getMealsByOrder = async (req, res) => {
  try {
    const { userIdToken } = req;

    const orders = await Order.findAll({
      where: { userId: userIdToken },
      attributes: ['id', 'totalPrice', 'quantity', 'status'],
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'price'],
          include: [
            {
              model: Restaurant,
              attributes: ['id', 'name', 'address', 'rating'],
            },
          ],
        },
      ],
    });

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

const completeOrder = async (req, res) => {
  try {
    const { order } = req;

    await order.update({ status: 'completed' });

    res.status(201).json({
      status: 'success',
      message: 'order has been successfully completed',
    });
  } catch (error) {
    console.log(error);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { order } = req;

    await order.update({ status: 'cancelled' });

    res.status(201).json({
      status: 'success',
      message: 'order has been successfully cancelled',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrder, getMealsByOrder, completeOrder, cancelOrder };
