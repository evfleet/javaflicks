import authTypes from './auth';

const types = [ authTypes ].join('\n');

export default `
  type User {
    id: Int
    email: String
    username: String
    verified: Boolean
  }

  ${types}

  type Query {
    getUser(email: String, username: String): User
  }

  type Mutation {
    authenticate(email: String!, refreshToken: String!): AuthResponse!
    login(identifier: String!, password: String!): AuthResponse!
    register(email: String!, username: String!, password: String!): SuccessResponse!
    verification(email: String!, verificationToken: String!): SuccessResponse
    requestResetPassword(email: String!): SuccessResponse
    resetPassword(email: String!, resetToken: String!, password: String!): SuccessResponse
  }
`;
