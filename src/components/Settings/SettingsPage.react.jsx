import React from 'react';
import {Link} from 'react-router';

import {MenuItem} from 'material-ui';

import './css/SettingsPage.scss';

export default React.createClass({

  render() {
    return (
      <div className='settings'>
        <div className='left-nav'>
          <Link to="settings/people"><MenuItem>People</MenuItem></Link>
          <Link to="settings/companies"><MenuItem>Companies</MenuItem></Link>
          <Link to="settings/rooms"><MenuItem>Rooms</MenuItem></Link>
        </div>
        <div className='settings-content'>
        {this.props.children}
        </div>
      </div>
    );
  }
});
