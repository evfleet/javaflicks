import { GraphQLScalarType } from 'graphql';
import { authTypes, authMutations } from './auth';
import { recipeTypes, recipeMutations } from './recipe';

const Date = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    return value;
  }
});

const types = [ authTypes, recipeTypes ].join('\n');
const queries = [].join('\n');
const mutations = [ authMutations, recipeMutations ].join('\n');

export default `
  scalar Date

  ${types}

  type Query {
    ${queries}
    getUser(email: String): User
  }

  type Mutation {
    ${mutations}
  }
`;
