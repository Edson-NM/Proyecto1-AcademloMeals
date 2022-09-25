const { Meal } = require('./meals.model');
const { Order } = require('./orders.model');
const { Restaurant } = require('./restaurants.model');
const { Review } = require('./reviews.model');
const { User } = require('./users.model');

const initModels = () => {
  // 1 User <---> M Orders
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User);

  // M Users <---> M Restaurants
  User.belongsToMany(Restaurant, { through: 'review', foreignKey: 'userId' });
  Restaurant.belongsToMany(User, {
    through: 'review',
    foreignKey: 'restaurantId',
  });

  //1 Restaurant <---> M Meals
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant);

  //1 Meal <---> 1 Order
  Meal.hasOne(Order);
  Order.hasOne(Meal);
};

module.exports = { initModels };
