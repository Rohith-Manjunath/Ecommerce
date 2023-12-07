const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxLength: [30, "Name can not be more than 30 characters"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [8, "password should have at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = async function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, { expiresIn: "24h" });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
