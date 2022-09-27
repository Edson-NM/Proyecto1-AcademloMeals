const { Order } = require('../models/orders.model');

const validateStatusOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ where: { id } });

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order with given ID was not found',
      });
    }

    req.order = order;
    next();
  } catch (error) {}
};

module.exports = { validateStatusOrder };
