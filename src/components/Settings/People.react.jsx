// Libraries
import React from 'react';
import PersonList from '../Person/PersonList.react';

export default React.createClass({

  displayName: 'Settings',

  render() {
    return (
      <div>
        <PersonList/>
      </div>
    );
  }
});
