const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    fname: String!
    street: String!
    city: String!
  }
  type Query {
    getAllUsers: [User!]!
  }
`;

module.exports = { typeDefs };
