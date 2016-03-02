// Libraries
import React from 'react';
// import Reflux from 'reflux';

// Components
import CalendarMonth from './CalendarMonth.react';
import BookingsList from '../Book/BookingsList.react';

import './css/calendar.scss';

export default React.createClass({

  displayName: 'Calendar',

  getDefaultProps() {
    return {
      data: {
        items: []
      }
    };
  },

  componentDidMount() {
    console.info('Calendar::componentDidMount');
  },

  componentWillUpdate() {
    console.info('Calendar::componentWillUpdate');
  },

  render() {
    return (
      <div className="calendar">
        <CalendarMonth />
        <BookingsList
          rooms={this.props.rooms}
          loading={this.props.loading}
          data={this.props.data}/>
      </div>
    );
  }
});
