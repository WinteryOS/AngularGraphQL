const express = require("express");

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  authenticateUser,
} = require("../controllers/user_controller");

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review_controller");

const router = express.Router();

router
  .post("/", createUser)
  .get("/", getUsers)
  .post("/authenticate", authenticateUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser)
  .post("/review", createReview)
  .get("/review", getReviews)
  .put("/review/:id", updateReview)
  .delete("/review/:id", deleteReview);

module.exports = router;
