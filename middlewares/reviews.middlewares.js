// Models
const { Restaurant } = require('../models/restaurants.model');
const { Review } = require('../models/reviews.model');
const { User } = require('../models/users.model');

const validateOwnerReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userIdToken } = req;

    const restaurantReview = await Review.findOne({
      where: { id, userId: userIdToken },
    });

    if (!restaurantReview) {
      return res.status(404).json({
        status: 'error',
        message: 'This is not your review. Can not be update it',
      });
    }

    // console.log(restaurantReview);
    req.restaurantReview = restaurantReview;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { validateOwnerReview };
