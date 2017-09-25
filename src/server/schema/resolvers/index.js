import { authQueries, authMutations } from './auth';

export default {
  Query: {
    ...authQueries
  },

  Mutation: {
    ...authMutations
  }
};
