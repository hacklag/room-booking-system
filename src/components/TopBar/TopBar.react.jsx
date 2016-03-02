// Libraries
import React from 'react';
import {Link} from 'react-router';
import Reflux from 'reflux';
import Moment from 'moment';

// Stores
import BookStore from './../../stores/BookStore';

// Components
import FlatButton from 'material-ui/lib/flat-button';

// Styles
import './css/topBar.scss';

export default React.createClass({

  displayName: 'TopBar',

  mixins: [Reflux.connect(BookStore)],

  componentDidMount() {
    console.info('TopBar::componentDidMount');
  },

  componentWillUpdate() {
    console.info('TopBar::componentWillUpdate');
  },

  render() {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let selectedDay = Moment(this.state.selectedDay).format('DD');

    selectedDay += ' of ' + monthNames[Moment(this.state.selectedDay).format('M') - 1];
    selectedDay += ', ' + Moment(this.state.selectedDay).format('dddd');

    return (
      <div className="top-bar">
        <div className="logo">{selectedDay}</div>
        <ul>
          <li><Link to="dashboard"><FlatButton label="Dashboard" /></Link></li>
          <li><Link to="settings"><FlatButton label="Settings" /></Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});
