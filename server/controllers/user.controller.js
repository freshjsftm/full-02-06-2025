const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');
const CONSTANTS = require('../constants');

module.exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      throw createError(409, 'Email already registered');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, role, password: hash });

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, 'Invalid data');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw createError(401, 'Invalid data');
    }
    // add jwt json web token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      CONSTANTS.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).send({ data: { token, user } });
  } catch (error) {
    next(error);
  }
};
