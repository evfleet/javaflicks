import React, { Component } from 'react';

class Layout extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        Layout
        {React.cloneElement(this.props.children, { user })}
      </div>
    );
  }
}

export default Layout;
