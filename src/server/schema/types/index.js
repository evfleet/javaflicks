export default `
  type User {
    id: Int
    email: String
    username: String
  }

  type Query {
    getUser(id: Int): User
  }
`;
