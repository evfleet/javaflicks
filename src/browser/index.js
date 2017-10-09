/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import offlineConfig from 'redux-offline/lib/defaults';
import offline from 'apollo-offline';

import { authReducer } from 'services/auth';
import Root from 'components/Root';

const { enhancer, networkInterface } = offline(
  createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin'
    }
  })
);

const client = new ApolloClient({
  networkInterface
});

networkInterface.setClient(client);

const store = createStore(
  combineReducers({
    auth: authReducer,
    apollo: client.reducer()
  }),
  undefined,
  compose(
    applyMiddleware(client.middleware()),
    enhancer(offlineConfig),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider store={store} client={client}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </ApolloProvider>
    </AppContainer>
    , document.getElementById('root'));
};

render(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const Root = require('./components/Root').default;
    try {
      render(Root);
    } catch (error) {
      location.reload();
    }
  });
}
