// Models
const { Order } = require('../models/orders.model');

const createOrder = async (req, res) => {
  try {
    const { quantity, mealId } = req.body;

    const order = await Order.create({ quantity, mealId });

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

module.exports = { createOrder };
