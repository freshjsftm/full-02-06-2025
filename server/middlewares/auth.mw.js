const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const CONSTANTS = require('../constants');
const User = require('../models/User');

module.exports.auth = async (req, res, next) => {
  try {
    const rowAuthorization = req.headers.authorization;
    const token = rowAuthorization?.replace('Bearer', '').trim();
    if (!token) {
      throw createError(401, 'Token required');
    }
    const decoded = jwt.verify(token, CONSTANTS.JWT_SECRET);
    const user = await User.findById(decoded?.id);
    if (!user) {
      throw createError(401, 'Invalid token');
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('auth error --->>>', error);
    next(createError(401, 'Unautorized'));
  }
};
