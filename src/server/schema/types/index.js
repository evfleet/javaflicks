import { authTypes } from './auth';
import { movieTypes } from './movie';

const types = [ authTypes, movieTypes ].join('\n');
const queries = [].join('\n');
const mutations = [].join('\n');

export default `
  ${types}

  type Query {
    ${queries}
    getUser(email: String): User
  }

  type Mutation {
    ${mutations}
    authenticate(email: String!, refreshToken: String!): AuthResponse!
    login(email: String!, password: String!): AuthResponse!
    register(email: String!, password: String!): SuccessResponse!
    verification(email: String!, verificationToken: String!): SuccessResponse
    requestResetPassword(email: String!): SuccessResponse
    resetPassword(email: String!, resetToken: String!, password: String!): SuccessResponse
  }
`;
