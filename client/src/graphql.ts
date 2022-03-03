import { gql } from 'apollo-angular';

export const AUTHENTICATE_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      fname
      lname
      email
      street
      state
      phone
      admin
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($input: ReviewInput!) {
    createReview(input: $input) {
      username
      rating
      review
      movieId
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUse($input: ID!) {
    deleteUser(input: $input)
  }
`;
export const DELETE_REVIEW = gql`
  mutation deleteRev($input: ID!) {
    deleteReview(input: $input)
  }
`;

export const GET_ALL_USERS = gql`
  {
    getAllUsers {
      _id
      username
      hash_password
      admin
      email
    }
  }
`;

export const GET_ALL_REVIEWS = gql`
  {
    getAllReviews {
      _id
      movieId
      username
      rating
      review
    }
  }
`;
