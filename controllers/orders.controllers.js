// Models
const { Order } = require('../models/orders.model');
const { Meal } = require('../models/meals.model');

const createOrder = async (req, res) => {
  try {
    const { quantity, mealId } = req.body;

    // const meal = await Meal.findOne({ where: { id: 'mealId' } });

    console.log(quantity);
    console.log(mealId);

    // if (!meal) {
    //   return res.status(404).json({
    //     status: 'errror',
    //     message: 'meal dont found with given ID. Choose another option',
    //   });
    // }

    // const totalPrice = quantity * meal.price;

    // console.log(totalPrice);

    // console.log(meal);

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
