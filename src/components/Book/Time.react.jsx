// Libraires
import React from 'react';
import moment from 'moment';

// Components
import TimeRow from './TimeRow.react';
import TimeLine from './TimeLine';

import './css/time.scss';

export default React.createClass({

  displayName: 'Time',

  componentDidMount() {
  },

  componentWillUpdate() {
  },

  render() {
    let rows = [];
    let time = moment(0, 'hours');

    for (let i = 0; i < 48; i += 1) {
      if ((i % 2) === 0) {
        rows.push(<TimeRow timestamp={time.format('HH:mm')} key={i}/>);
      } else {
        rows.push(<TimeRow key={i}/>);
      }
      time = moment(time).add(30, 'minutes');
    }

    return (
      <div className="time">
        <TimeLine />
        <div>
          {rows}
        </div>
      </div>
    );
  }
});
