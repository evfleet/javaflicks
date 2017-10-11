export const recipeTypes = `
  type Recipe {
    id: Int!
    name: String!
    directions: [String!]!
    ingredients: [String!]!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;

export const recipeQueries = `
  getUserRecipes(id: Int): [Recipe!]!
`;

export const recipeMutations = `
  addRecipe(name: String!, directions: [String!]!, ingredients: [String!]!): Recipe!
`;