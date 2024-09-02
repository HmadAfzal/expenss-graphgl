import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SiguUp($input: signupInput!) {
    signUp(input: $input) {
      _id
      username
      name
      profilePicture
    }
  }
`;


export const LOG_IN = gql`
  mutation Login($input: loginInput!) {
    login(input: $input) {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const LOG_OUT = gql`
  mutation LogOut {
    logout {
  message
    }
  }
`;