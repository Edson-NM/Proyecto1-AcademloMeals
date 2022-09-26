// Models
const { where } = require('sequelize');
const { Restaurant } = require('../models/restaurants.model');
const { Review } = require('../models/reviews.model');

const createRestaurant = async (req, res) => {
  try {
    const { name, address, rating } = req.body;

    const newRestaurant = await Restaurant.create({ name, address, rating });

    res.status(201).json({
      status: 'success',
      data: {
        newRestaurant,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllActiveRestaurants = async (req, res) => {
  try {
    const restaurant = await Restaurant.findAll({
      where: { status: 'active' },
      attributes: ['id', 'name', 'address', 'rating'],
      include: [{ model: Review, attributes: ['comment', 'rating'] }],
    });

    res.status(200).json({
      status: 'success',
      data: {
        restaurant,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
      where: { id, status: 'active' },
      attributes: ['id', 'name', 'address', 'rating'],
      include: [
        {
          model: Review,
          attributes: ['comment', 'rating'],
          where: { status: 'deleted' },
        },
      ],
    });

    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        message: 'Restaurant with given id doesnt exist',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        restaurant,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { restaurant } = req;
    const { name, address } = req.body;

    await restaurant.update({ name, address });

    res.status(201).json({
      status: 'success',
      data: {
        restaurant,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { restaurant } = req;

    await restaurant.update({ status: 'disabled' });

    res.status(201).json({
      status: 'success',
      message: 'Restaurant has been successfully deleted',
    });
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { restaurantId } = req.params;
    const { userIdToken } = req;

    const review = await Review.create({
      comment,
      rating,
      restaurantId,
      userId: userIdToken,
    });

    res.status(201).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (req, res) => {
  try {
    const { restaurantReview } = req;
    const { comment, rating } = req.body;

    await restaurantReview.update({ comment, rating });

    res.status(201).json({
      status: 'success',
      data: {
        restaurantReview,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { restaurantReview } = req;

    await restaurantReview.update({ status: 'deleted' });

    res.status(201).json({
      status: 'success',
      message: 'Review has been successfully deleted',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRestaurant,
  getAllActiveRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
