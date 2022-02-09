const Review = require("../models/review_schema");

const createReview = (req, res) => {
  const newReview = new Review(req.body);
  newReview.save((err, review) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      return res.json(review);
    }
  });
};

const getReviews = (req, res) => {
  Review.find({}, (err, review) => {
    if (err) res.send(err);
    res.json(review);
  });
};

const updateReview = (req, res) => {
  Review.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, review) => {
      if (err) res.send(err);
      res.json(review);
    }
  );
};

const deleteReview = (req, res) => {
  Review.deleteOne({ _id: req.params.id }, (err, review) => {
    if (err) res.send(err);
    res.json({ message: "Review deleted." });
  });
};

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};
