import jwt from 'jsonwebtoken';

export const recipeMutations = {
  async addRecipe(parent, { name, directions, ingredients }, { req, models }) {
    try {
      const token = req.signedCookies.refreshToken;
      const { id, username } = token ? jwt.decode(token) : { id: null };

      if (!id || !username) {
        throw new Error('Invalid authentication');
      }

      // query to see if user already has a recipe with that name
      // allow duplicate recipe names but not from same user?

      const recipe = await models.Recipe.create({
        name,
        directions,
        ingredients,
        userId: id
      });

      return {
        name: recipe.name,
        directions: recipe.directions,
        ingredients: recipe.ingredients,
        user: {
          id,
          username
        }
      };
    } catch (error) {
      console.log(error);

      switch (error.message) {
        case 'Invalid authentication':
          throw new Error('Invalid authentication');
        default:
          throw new Error('Unexpected server error');
      }
    }
  }
};