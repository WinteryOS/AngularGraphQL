const { users } = require("../testData");

const resolvers = {
  Query: {
    getAllUsers() {
      //Get API Data
      return users;
    },
  },
};

module.exports = { resolvers };
