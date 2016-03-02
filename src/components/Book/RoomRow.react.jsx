// Libraries
import React from 'react';

// Stores and Actions
import Actions from '../../actions/RoomsActions';

// Components
import Reservation from './Reservation.react';

export default React.createClass({

  displayName: 'RoomRow',

  componentDidMount() {
  },

  componentWillUpdate() {
  },

  handleClick(event) {
    event.preventDefault();
    Actions.clickRoomRow(this.props.roomId, this.props.time);
  },

  render() {
    return (
      <div
        onClick={this.handleClick}
        className="room-row">
        <Reservation />
      </div>
    );
  }
});
