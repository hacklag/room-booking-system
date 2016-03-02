// Libraries
import React from 'react';

export default React.createClass({

  displayName: 'Loader',

  componentDidMount() {
    console.info('Dashboard::componentDidMount');
  },

  componentWillUpdate() {
    console.info('Dashboard::componentWillUpdate');
  },

  render() {
    return (
      <div className="loader">
        {this.props.loading ? 'Loading...' : null}
      </div>
    );
  }
});
