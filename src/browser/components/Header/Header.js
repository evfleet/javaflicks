import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        Header

        {user && (
          <p>Username: {user.username}</p>
        )}
      </div>
    );
  }
}

export default Header;