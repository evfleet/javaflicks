import React, { Component } from 'react';

export default class Layout extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <div>
          {React.cloneElement(this.props.children, {})}
        </div>
      </div>
    );
  }
}
