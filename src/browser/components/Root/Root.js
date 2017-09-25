import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';

import storage from 'config/storage';
import Layout from 'components/Layout';
import Auth from 'screens/Auth';
import Landing from 'screens/Landing';
import Verification from 'screens/Verification';
import { authenticationMutation } from 'mutations';

@withRouter
@graphql(authenticationMutation)

export default class Root extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      auth: {
        email: null,
        loggedIn: false
      },
      errors: []
    };
  }

  componentWillMount() {
    this.authenticate();
  }

  async authenticate() {
    try {
      const { email, refreshToken } = await storage.getAuth();
      const { data: { authenticate: result } } = await this.props.mutate({
        variables: { email, refreshToken }
      });

      if (!result.verified) {
        this.setState({
          isLoading: false,
          auth: {
            email: result.email,
            loggedIn: false
          },
          errors: []
        }, () => this.props.history.replace('/verification'));
      } else {
        this.setState({
          isLoading: false,
          auth: {
            email: result.email,
            loggedIn: true
          },
          errors: []
        }, async () => {
          await storage.setAuth(result);
          this.props.history.replace('/');
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        auth: {
          email: null,
          loggedIn: false
        },
        errors: []
      }, async () => {
        this.props.history.replace('/login');
      });
    }
  }

  render() {
    const { isLoading } = this.state;

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
              path="/login"
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