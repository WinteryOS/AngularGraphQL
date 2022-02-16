const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip_code: {
      type: Number,
    },
    email: {
      type: String,
    },
    hash_password: {
      type: String,
    },
    phone: {
      type: String,
    },
    username: {
      type: String,
    },
    admin: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = model("users", userSchema);
