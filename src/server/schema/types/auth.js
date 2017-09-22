export default `
  type AuthResponse {
    email: String!,
    username: String!,
    verified: Boolean!,
    accessToken: String!,
    refreshToken: String!
  }

  type SuccessResponse {
    success: Boolean!
  }
`;
