import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import storage from 'config/storage';
import Layout from 'components/Layout';
import { authActions } from 'services/auth';
import { authenticationMutation } from 'mutations';

class Root extends Component {
  componentWillMount() {
    this.authenticate();
  }

  async authenticate() {
    try {
      const { email, refreshToken } = await storage.getAuth();

      const { data: { authenticate: result } } = await this.props.mutate({
        variables: { email, refreshToken }
      });

      this.props.actions.loginPass(result);
    } catch (error) {
      this.props.actions.loginFail();
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

const withAuthentication = graphql(authenticationMutation);

const RootWithAuthentication = withAuthentication(
  withRouter(Root)
);

export default connect(
  ({ auth }) => ({ auth }),
  (dispatch) => ({ actions: bindActionCreators(authActions, dispatch) })
)(RootWithAuthentication);
