import { authTypes, authQueries, authMutations } from './auth';
import { recipeTypes, recipeQueries, recipeMutations } from './recipe';

const types = [ authTypes, recipeTypes ].join('\n');
const queries = [ authQueries, recipeQueries ].join('\n');
const mutations = [ authMutations, recipeMutations ].join('\n');

export default `
  ${types}

  type Query {
    ${queries}
  }

  type Mutation {
    ${mutations}
  }
`;
