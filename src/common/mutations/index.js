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