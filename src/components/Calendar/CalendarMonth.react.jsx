// Libraries
import React from 'react';

// Stores and Actions
import BookActions from '../../actions/BookActions';

// Components
import Calendar from 'rc-calendar';

import './css/calendarMonth.scss';

export default React.createClass({

  displayName: 'CalendarMonth',

  componentDidMount() {
    console.info('CalendarMonth::componentDidMount');
  },

  componentWillUpdate() {
    console.info('CalendarMonth::componentWillUpdate');
  },

  onChangeSelectedDay(e) {
    BookActions.changeSelectedDay(e.time);
  },

  render() {
    return (
      <div className="CalendarMonth">
        <Calendar
          onChange={this.onChangeSelectedDay}
          showDateInput={false}
          showToday={false}
          showWeekNumber={true}/>
      </div>
    );
  }
});
