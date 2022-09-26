// Model
const { Restaurant } = require('../models/restaurants.model');
const { User } = require('../models/users.model');

const adminUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const adminUserValue = await User.findOne({
      where: { id: user.id, role: 'admin' },
    });

    if (!adminUserValue) {
      return res.status(404).json({
        status: 'error',
        message: 'User have not admin credentials',
      });
    }
    const restaurant = await Restaurant.findOne({ where: { id } });

    req.restaurant = restaurant;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { adminUser };
