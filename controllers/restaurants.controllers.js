// Models
const { Restaurant } = require('../models/restaurants.model');

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

// const updateRestaurant = async () => {
//   try {
//     const { adminUser } = req;
//     const { name, address } = req.body;

//     await adminUser.update({ name, address });

//     res.status(201).json({
//       status: 'success',
//       data: {
//         adminUser,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  createRestaurant,
  getAllActiveRestaurants,
  getRestaurantById,
};
