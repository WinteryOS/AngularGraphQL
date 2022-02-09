const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  movieId: {
    type: String,
  },
  username: {
    type: String,
  },
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
});

module.exports = model("review", reviewSchema);
