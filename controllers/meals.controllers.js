// Models
const { Meal } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');

const createMeal = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;

    const meal = await Meal.create({ name, price, restaurantId: id });

    res.status(200).json({
      status: 'success',
      data: {
        meal,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const GetAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll({
      where: { status: 'active' },
      attributes: ['id', 'name', 'price'],
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      data: {
        meals,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const GetOneMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meals = await Meal.findAll({
      where: { id, status: 'active' },
      attributes: ['id', 'name', 'price'],
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      data: {
        meals,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const updateMeal = async (req, res) => {
  try {
    const { meal } = req;
    const { name, price } = req.body;

    await meal.update({ name, price });

    res.status(201).json({
      status: 'success',
      data: {
        meal,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteMeal = async (req, res) => {
  try {
    const { meal } = req;

    await meal.update({ status: 'disabled' });

    res.status(201).json({
      status: 'error',
      message: 'Meal with given ID has been succesfully removed',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMeal,
  GetAllMeals,
  GetOneMeal,
  updateMeal,
  deleteMeal,
};
