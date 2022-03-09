const User = require("../models/user_schema");
const Review = require("../models/review_schema");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await User.find({});
    },
    getAllReviews: async () => {
      return await Review.find({});
    },
  },
  Mutation: {
    createUser: (_, { input }) => {
      const newUser = new User(input);
      newUser.hash_password = bcrypt.hashSync(input.password, 10);
      return new Promise((resolve, object) => {
        newUser.save((err) => {
          if (err) {
            return err;
          } else {
            resolve(newUser);
          }
        });
      });
    },
    createReview: (_, { input }) => {
      const newReview = new Review(input);
      return new Promise((resolve, object) => {
        newReview.save((err) => {
          if (err) {
            return err;
          } else {
            resolve(newReview);
          }
        });
      });
    },
    login: async (_, { input }) => {
      const { username, password } = input;
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error("No user with that username");
      }
      const valid = await bcrypt.compare(password, user.hash_password);
      if (!valid) {
        throw new Error("Incorrect password");
      }
      return (
        jsonwebtoken.sign({ username: user.username }, "MovieReviews", {
          expiresIn: "1d",
        }) +
        ` ${user.admin}` +
        ` ${user.username}`
      );
    },
    deleteUser: async (_, { input }) => {
      const user = await User.deleteOne({ _id: input });
      if (!user) {
        throw new Error("No user with that ID");
      }
      return "User Deleted";
    },
    deleteReview: async (_, { input }) => {
      const review = await Review.deleteOne({ _id: input });
      if (!review) {
        throw new Error("No review with that ID");
      }
      return "User Deleted";
    },
  },
};

module.exports = { resolvers };
