import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { authActions } from 'services/auth';
import Layout from 'components/Layout';

class Root extends Component {
  async componentWillMount() {
    try {
      const credentials = localStorage.getItem('auth');
      const { email, refreshToken } = JSON.parse(credentials);

      const { data: { authenticate: result } } = await this.props.mutate({
        variables: {
          email,
          refreshToken: '1'
        }
      });

      localStorage.setItem('auth', JSON.stringify({
        email: result.email,
        refreshToken: result.refreshToken
      }));

      this.props.actions.setAuth({
        email: result.email,
        username: result.username
      });
    } catch (error) {
      this.props.actions.setAuth(null);
    }
  }

  render() {
    const { auth: { isLoading, user } } = this.props;

    return (
      <Layout user={user}>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <div>Finished loading</div>
        )}
      </Layout>
    );
  }
}

const withAuthentication = graphql(gql`
  mutation ($email: String!, $refreshToken: String!) {
    authenticate(email: $email, refreshToken: $refreshToken) {
      email,
      username,
      verified,
      accessToken,
      refreshToken
    }
  }
`);

const RootWithAuthentication = withAuthentication(
  withRouter(Root)
);

export default connect(
  ({ auth }) => ({ auth }),
  (dispatch) => ({ actions: bindActionCreators(authActions, dispatch) })
)(RootWithAuthentication);
