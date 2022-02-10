const User = require("../models/user_schema");

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await User.find({});
    },
  },
};

module.exports = { resolvers };
