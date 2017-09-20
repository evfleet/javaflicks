import React, { Component } from 'react';

import Header from 'components/Header';

class Layout extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <Header user={user} />

        <div>
          {React.cloneElement(this.props.children, {})}
        </div>
      </div>
    );
  }
}

export default Layout;
