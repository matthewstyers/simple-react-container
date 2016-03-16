import React from 'react';
import { Component } from 'react';

import { TechnologyList } from './technology/list';

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
