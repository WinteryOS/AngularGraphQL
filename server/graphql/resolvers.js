const User = require("../models/user_schema");
const Review = require("../models/review_schema");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await User.find({});
    },
    getAllReviews: async () => {
      return await Review.find({});
    },

    //https://codeburst.io/build-a-simple-weather-app-with-node-js-in-just-16-lines-of-code-32261690901d
    // https://developer.okta.com/blog/2021/10/22/angular-graphql
    //https://www.youtube.com/watch?v=dp_64aX_6jI
  },
  Mutation: {
    createUser: (root, { input }) => {
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
    createReview: (root, { input }) => {
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
    // DELETE USER
    // DELETE REVIEW
  },
};

module.exports = { resolvers };
