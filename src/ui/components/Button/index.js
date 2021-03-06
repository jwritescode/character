import React, { Component } from 'react';
import cn from 'classnames';

export default class Button extends Component {

  static defaultProps = {
    size : 'md'
  }

  render() {
    let { size, style, children, ...props } = this.props;
    let css = cn({
      'button' : true,
      'button-sm' : size === 'sm',
      'button-md' : size === 'md',
      'button-lg' : size === 'lg',
      'button-sq' : size === 'sq',
      'button-bl' : style === 'blue',
      'button-gr' : style === 'green',
      'button-rd' : style === 'red',
      'button-gd' : style === 'gold'
    })

    return (
      <button className={css} {...props}>{children}</button>
    );
  }
}
