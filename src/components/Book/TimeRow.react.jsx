// Libraries
import React from 'react';

export default React.createClass({

  displayName: 'TimeRow',

  getDefaultProps() {
    return {
      timestamp: ''
    };
  },

  componentDidMount() {
  },

  componentWillUpdate() {
  },

  render() {
    return (
      <div className="time-row">
        {this.props.timestamp}
      </div>
    );
  }
});
