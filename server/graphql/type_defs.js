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
  input UserInput {
    fname: String!
    street: String!
    city: String!
  }
  type Mutation {
    createUser(input: UserInput!): User!
  }
`;

module.exports = { typeDefs };
