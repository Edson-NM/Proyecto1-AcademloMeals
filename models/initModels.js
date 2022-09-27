const { Meal } = require('./meals.model');
const { Order } = require('./orders.model');
const { Restaurant } = require('./restaurants.model');
const { Review } = require('./reviews.model');
const { User } = require('./users.model');

const initModels = () => {
  // 1 User <---> M Orders
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User);

  // 1 User <---> M Reviews
  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User);

  //1 Restaurant <---> M Meals
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant);

  // 1 Restaurant <---> M Reviews
  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant);

  //1 Meal <---> 1 Order
  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = { initModels };
