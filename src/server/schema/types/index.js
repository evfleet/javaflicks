import authTypes from './auth';

const types = [ authTypes ].join('\n');

export default `
  type User {
    id: Int
    email: String
    verified: Boolean
  }

  ${types}

  type Query {
    getUser(email: String): User
  }

  type Mutation {
    authenticate(email: String!, refreshToken: String!): AuthResponse!
    login(email: String!, password: String!): AuthResponse!
    register(email: String!, password: String!): SuccessResponse!
    verification(email: String!, verificationToken: String!): SuccessResponse
    requestResetPassword(email: String!): SuccessResponse
    resetPassword(email: String!, resetToken: String!, password: String!): SuccessResponse
  }
`;
