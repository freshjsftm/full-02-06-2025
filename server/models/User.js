const mongoose = require('mongoose');
const CONSTANTS = require('../constants');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 5, maxLength: 255 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, //hash password
    role: {
      type: String,
      enum: CONSTANTS.USER_ROLES,
      default: CONSTANTS.USER_ROLES[0], //'customer'
    },
  },
  { timestamps: true }
);

// delete password

const User = mongoose.model('User', userSchema);

module.exports = User;
