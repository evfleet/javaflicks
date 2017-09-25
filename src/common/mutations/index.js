import { gql } from 'react-apollo';

export const authenticationMutation = gql`
  mutation ($email: String!, $refreshToken: String!) {
    authenticate(email: $email, refreshToken: $refreshToken) {
      email,
      verified,
      accessToken,
      refreshToken
    }
  }
`;

export const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email,
      verified,
      accessToken,
      refreshToken
    }
  }
`;

export const registerMutation = gql`
  mutation ($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      success
    }
  }
`;
