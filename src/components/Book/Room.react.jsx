// Libraries
import React from 'react';
import moment from 'moment';

// Components
import RoomRow from './RoomRow.react';

import './css/room.scss';

export default React.createClass({

  displayName: 'Room',

  componentDidMount() {
    console.info('Room::componentDidMount');
  },

  componentWillUpdate() {
    console.info('Room::componentWillUpdate');
  },

  render() {
    let rows = [];
    let time = moment(this.props.selectedDay).hours('00').minutes('00');
    let reservations = [];

    for (let i = 0; i < 48; i += 1) {
      rows.push(
        <RoomRow
          key={i}
          roomId={this.props.roomId}
          time={time} />
      );
      time = moment(time).add(30, 'minutes');
    }

    this.props.reservations.forEach((reservation) => {
      let startHour = moment(reservation.starttime.value).format('H');
      let endHour = moment(reservation.endtime.value).format('H');
      let startMin = moment(reservation.starttime.value).format('m');
      let endMin = moment(reservation.endtime.value).format('m');
      let height = ((endHour - startHour) * 60) + ((endMin - startMin) / 60 * 60);
      let topPosition = (startHour * 60) + (startMin * 0.8);
      let style = {
        // we need to find out where we missed those 6pxs
        top: `${topPosition + 6}px`,
        height: `${height}px`,
        borderLeft: `4px solid ${reservation.company ? reservation.company.color : null}`
      };
      let photoStyle = {
        float: 'left',
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        border: '2px solid #fff'
      };
      let labelStyle = {
        float: 'left',
        padding: '4px',
        fontSize: '13px'
      };

      reservations.push(
        <div
          key={reservation.id}
          style={style}
          className="example-item">
            <img style={photoStyle} src={reservation.person.photo.value} />
            <div style={labelStyle}>
              {reservation.title}
            </div>

        </div>
      );
    });

    return (
      <div className="room">
        <div className="room-wrapper">
          {reservations}
          {rows}
        </div>
      </div>
    );
  }
});
