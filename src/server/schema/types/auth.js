
export const authTypes = `
  type User {
    id: Int
    email: String
    verified: Boolean
  }

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
