export default `
  type User {
    id: Int
    email: String
    username: String
  }

  type Query {
    getUser(email: String, username: String): User
  }

  type Mutation {
    login(identifier: String!, password: String!): User!
    register(email: String!, username: String!, password: String!): User!
  }
`;
