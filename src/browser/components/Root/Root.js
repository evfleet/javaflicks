import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import storage from 'config/storage';
import Layout from 'components/Layout';
import Auth from 'screens/Auth';
import Landing from 'screens/Landing';
import Verification from 'screens/Verification';
import { authActions } from 'services/auth';
import { authenticationMutation } from 'mutations';

@withRouter
@graphql(authenticationMutation)
@connect(
  ({ auth, rehydrated }) => ({ auth, rehydrated }),
  (dispatch) => ({ actions: bindActionCreators({
    verificationFail: authActions.verificationFail,
    authenticationPass: authActions.authenticationPass,
    authenticationFail: authActions.authenticationFail
  }, dispatch) })
)

export default class Root extends Component {
  componentWillMount() {
    // this.authenticate();
  }

  async authenticate() {
    const { actions, history, mutate } = this.props;

    try {
      const { email, refreshToken } = await storage.getAuth();
      const { data: { authenticate: result } } = await mutate({
        variables: { email, refreshToken }
      });

      if (!result.verified) {
        await actions.verificationFail(result);
        history.replace('/verification');
      } else {
        await actions.authenticationPass(result);
        history.replace('/');
      }
    } catch (error) {
      await actions.authenticationFail();
      history.replace('/auth');
    }
  }

  render() {
    const { auth: { isLoading } } = this.props;

    return (
      <Layout>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              component={ Landing }
            />

            <Route
              path="/auth"
              component={ Auth }
            />

            <Route path="/verification" render={(props) => (
              <Verification
                {...props}
              />
            )} />
          </Switch>
        )}
      </Layout>
    );
  }
}