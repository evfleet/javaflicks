import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import Input from 'components/Input';
import { authActions } from 'services/auth';
import { loginMutation } from 'mutations';

const initialFields = {
  email: {
    value: '',
    errors: []
  },
  password: {
    value: '',
    errors: []
  }
};

@withRouter
@graphql(loginMutation)
@connect(
  ({ auth }) => ({ auth }),
  (dispatch) => ({ actions: bindActionCreators({
    loginPass: authActions.loginPass,
    loginFail: authActions.loginFail,
    verificationFail: authActions.verificationFail
  }, dispatch) })
)

export default class Auth extends Component {
  state = {
    fields: initialFields,
    errors: []
  }

  async login() {
    const { actions, history, mutate } = this.props;
    const { fields: { email, password } } = this.state;

    try {
      const { data: { login: result } } = await mutate({
        variables: {
          email: email.value,
          password: password.value
        }
      });

      await actions.loginPass(result);
      history.replace('/');
    } catch (error) {
      switch (error.message) {
        case 'GraphQL error: Email has not been verified':
          await actions.verificationFail({ email: email.value });
          history.replace('/verification');
          break;
        case 'GraphQL error: Invalid account/password combination':
          await actions.loginFail();
          this.setState({
            fields: initialFields,
            errors: ['Invalid account/password combination']
          });
          break;
        default:
          this.setState({
            fields: initialFields,
            errors: ['Unexpected server error']
          });
          break;
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.login();
  }

  handleChange = (field, value) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: {
          ...this.state.fields[field],
          value
        }
      }
    });
  }

  render() {
    const { fields, errors } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {Object.keys(fields).map((field) => (
            <Input
              key={field}
              field={field}
              inputType={field === 'password' ? 'password' : 'text'}
              value={fields[field].value}
              errors={fields[field].errors}
              handleChange={this.handleChange}
            />
          ))}

          {errors.map((error, index) => (
            <p key={`error-${index}`}>{error}</p>
          ))}

          <input type="submit" />
        </form>
      </div>
    );
  }
}