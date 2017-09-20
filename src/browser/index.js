/* eslint-disable no-unused-vars */

import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: '/graphql'
});

const client = new ApolloClient({
  networkInterface
});

class App extends React.Component {
  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

render(
  <ApolloProvider client={ client }>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
);
