const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const User = require('../models/User');

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
