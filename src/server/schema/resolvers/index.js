import { authQueries, authMutations } from './auth';
import { recipeQueries, recipeMutations } from './recipe';

export default {
  Query: {
    ...authQueries,
    ...recipeQueries
  },

  Mutation: {
    ...authMutations,
    ...recipeMutations
  }
};
