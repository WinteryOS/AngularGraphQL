const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: String!
    fname: String!
    lname: String!
    street: String!
    city: String!
    state: String!
    zip_code: Int!
    email: String!
    phone: String!
    username: String!
    admin: Boolean!
    password: String!
  }
  type Review {
    _id: String!
    movieId: String!
    username: String!
    rating: Int!
    review: String!
  }
  type Query {
    getAllUsers: [User!]!
    getAllReviews: [Review!]!
  }
  input UserInput {
    fname: String!
    lname: String!
    street: String!
    city: String!
    state: String!
    zip_code: Int!
    email: String!
    phone: String!
    username: String!
    admin: Boolean!
    password: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  input ReviewInput {
    movieId: String!
    username: String!
    rating: Int!
    review: String!
  }
  input ID {
    _id: String!
  }
  type Mutation {
    createUser(input: UserInput!): User!
    createReview(input: ReviewInput!): Review!
    login(input: LoginInput!): String!
    deleteUser(input: ID!): String!
    deleteReview(input: ID!): String!
  }
`;

module.exports = { typeDefs };
