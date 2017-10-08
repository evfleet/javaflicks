import { authTypes, authMutations } from './auth';
import { movieTypes } from './movie';

const types = [ authTypes, movieTypes ].join('\n');
const queries = [].join('\n');
const mutations = [ authMutations ].join('\n');

export default `
  ${types}

  type Query {
    ${queries}
    getUser(email: String): User
  }

  type Mutation {
    ${mutations}

  }
`;
