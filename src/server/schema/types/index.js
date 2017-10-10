import { authTypes, authMutations } from './auth';

const types = [ authTypes ].join('\n');
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
