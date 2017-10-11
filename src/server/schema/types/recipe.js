export const recipeTypes = `
  type Recipe {
    id: Int!
    name: String!
    directions: [String!]!
    ingredients: [String!]!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }
`;

export const recipeMutations = `
  addRecipe(name: String!, directions: [String!]!, ingredients: [String!]!): Recipe!
`;