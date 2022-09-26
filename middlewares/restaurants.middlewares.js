// Model
const { Restaurant } = require('../models/restaurants.model');
const { User } = require('../models/users.model');

const restaurantAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const adminUser = await User.findOne({ where: { id, role: 'admin' } });

    if (!adminUser) {
      res.status(404).json({
        status: 'error',
        message: 'User have not admin credentials',
      });
    }

    // req.adminUser = adminUser;
    next();
  } catch (error) {
    console.log(error);
  }
};
