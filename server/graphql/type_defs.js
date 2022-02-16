const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
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
  input ReviewInput {
    movieId: String!
    username: String!
    rating: Int!
    review: String!
  }
  type Mutation {
    createUser(input: UserInput!): User!
    createReview(input: ReviewInput): Review!
  }
`;

module.exports = { typeDefs };
