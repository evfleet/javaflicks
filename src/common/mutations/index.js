import { gql } from 'react-apollo';

export const authenticationMutation = gql`
  mutation ($email: String!, $refreshToken: String!) {
    authenticate(email: $email, refreshToken: $refreshToken) {
      email,
      username,
      verified,
      accessToken,
      refreshToken
    }
  }
`;

export const loginMutation = gql`
  mutation ($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      email,
      username,
      verified,
      accessToken,
      refreshToken
    }
  }
`;

export const registerMutation = gql`
  mutation ($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      success
    }
  }
`;
