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

export const GET_ALL_USERS = gql`
  {
    getAllUsers {
      fname
      city
      street
    }
  }
`;

export const GET_ALL_REVIEWS = gql`
  {
    getAllReviews {
      movieId
      username
      rating
      review
    }
  }
`;
