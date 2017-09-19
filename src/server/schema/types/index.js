export default `
  type User {
    id: Int
    email: String
    username: String
    verified: Boolean
  }

  type Query {
    getUser(email: String, username: String): User
  }

  type AuthResponse {
    email: String!,
    username: String!,
    verified: Boolean!,
    accessToken: String!,
    refreshToken: String!
  }

  type Mutation {
    login(identifier: String!, password: String!): AuthResponse!
    register(email: String!, username: String!, password: String!): User!
  }
`;
