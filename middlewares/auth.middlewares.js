// JWT
const jwt = require('jsonwebtoken');

// dotenv
const dotenv = require('dotenv');

// Models
const { User } = require('../models/users.model');

dotenv.config({ path: './config.env' });

const protectSession = async (req, res, next) => {
  try {
    // Get token
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(403).json({
        status: 'error',
        message: 'Invalid session',
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { id: decodedToken.id, status: 'active' },
    });

    if (!user) {
      res.status(403).json({
        status: 'error',
        message: 'Owners token is no longer active',
      });
    }

    req.user = user;
    req.userIdToken = user.id;

    // Get access
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { protectSession };
