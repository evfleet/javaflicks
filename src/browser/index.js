/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import thunk from 'redux-thunk';

import { authReducer } from 'services/auth';
import Root from 'components/Root';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface
});

const store = createStore(
  combineReducers({
    auth: authReducer,
    apollo: client.reducer()
  }),
  {},
  compose(
    applyMiddleware(thunk, client.middleware()),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

render(
  <ApolloProvider store={store} client={client}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </ApolloProvider>
  , document.getElementById('root')
);
