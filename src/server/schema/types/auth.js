export default `
  type AuthResponse {
    email: String!,
    verified: Boolean!,
    accessToken: String!,
    refreshToken: String!
  }

  type SuccessResponse {
    success: Boolean!
  }
`;
