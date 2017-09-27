import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

export default class Input extends Component {
  state = {
    isFocused: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== '') {
      this.setState({ isFocused: true });
    }
  }

  handleBlur = () => {
    if (this.props.value === '') {
      this.setState({ isFocused: false });
    }
  }

  handleFocus = () => {
    if (this.props.value === '') {
      this.setState({ isFocused: true });
    }
  }

  render() {
    const { isFocused } = this.state;
    const { field, inputType, value, handleChange } = this.props;

    const duration = 300;

    const defaultStyle = {
      position: 'absolute',
      left: 4,
      top: 4,
      fontSize: 18,
      transitionDuration: `${duration}ms`,
      transitionProperty: `top, font-size`,
      transitionTimingFunction: 'ease-in-out',
      textTransform: 'capitalize'
    };

    const animationStyle = {
      top: -24,
      fontSize: 14
    };

    const transitionStyles = {
      entered: animationStyle,
      entering: animationStyle
    };

    return (
      <div style={{ paddingTop: 30 }}>
        <div style={{ position: 'relative' }}>
          <Transition in={isFocused} timeout={duration}>
            {(state) => (
              <label style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                {field}
              </label>
            )}
          </Transition>

          <input
            type={inputType}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={(event) => handleChange(field, event.target.value)}
            value={value}
            style={{ height: 26, fontSize: 18, paddingLeft: 4 }}
          />
        </div>

      </div>
    );
  }
}

Input.propTypes = {
  field: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf(['text', 'password']),
  value: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};