import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTechnologies } from '../actions/index';

class TechnologyList extends Component {
  componentWillMount() {
    this.props.fetchTechnologies();
  }

  render() {
    return (
      <div>
        Balls, man.
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, { fetchTechnologies })(TechnologyList);
