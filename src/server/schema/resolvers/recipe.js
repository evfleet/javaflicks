import jwt from 'jsonwebtoken';

export const recipeMutations = {
  async addRecipe(parent, { name, directions, ingredients }, { req, models }) {
    try {
      const token = req.signedCookies.refreshToken;
      const { id, username } = token ? jwt.decode(token) : { id: null };

      if (!id || !username) {
        throw new Error('Invalid authentication');
      }

      const recipes = await models.Recipe.findAll({ where: { name } }, { raw: true }).map((r) => r.toJSON());

      if (recipes.find((r) => r.userId === id)) {
        throw new Error('Recipe name already used by user');
      }

      const recipe = await models.Recipe.create({
        name,
        directions,
        ingredients,
        userId: id
      });

      return {
        ...recipe.toJSON(),
        user: {
          id,
          username
        }
      };
    } catch (error) {
      switch (error.message) {
        case 'Recipe name already used by user':
        case 'Invalid authentication':
          throw new Error(error.message);
        default:
          throw new Error('Unexpected server error');
      }
    }
  }
};