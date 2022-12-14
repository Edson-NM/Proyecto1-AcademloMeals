// Models
const { User } = require('../models/users.model');

const userExist = async (req, res, next) => {
  try {
    const { userIdToken } = req;
    const { id } = req.params;

    const user = await User.findOne({ where: { id: userIdToken } });

    if (userIdToken !== +id || !user) {
      return res.status(404).json({
        status: 'error',
        message: 'Can not update this profile',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userExist };
