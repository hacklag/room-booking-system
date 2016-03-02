import React from 'react';
// import Reflux from 'reflux';
import Moment from 'moment';
// import Actions from '../actions/BookActions';

import Room from './Room.react';
import Time from './Time.react';

import './css/book.scss';

export default React.createClass({

  displayName: 'Book',

  getDefaultProps() {
    return {
      data: {
        items: []
      },
      selectedDay: Moment().format()
    };
  },

  getInitialState() {
    return {
      windowHeight: window.innerHeight
    };
  },

  componentDidMount() {
    console.info('Book::componentDidMount');

    window.addEventListener('resize', this.handleResize);
  },

  componentWillUpdate() {
    console.info('Book::componentWillUpdate');
  },

  handleResize() {
    this.setState({windowHeight: window.innerHeight});
  },

  renderLabels() {
    let labels = [];

    this.props.rooms.forEach((room) => {
      labels.push(
        <div key={room.id} className="label">{room.name}</div>
      );
    });

    return labels;
  },

  renderRooms() {
    let reservations = [];
    let people = this.props.data.people;
    let companies = this.props.data.companies ? this.props.data.companies : [];
    let rooms = [];

    this.props.data.items.forEach((reservation) => {
      let item = Object.create(reservation);

      item.person = people.filter((el) => { return item.person.value === el.id; })[0];
      item.company = companies.filter((el) => { return item.person.company.value === el.id; })[0];
      reservations.push(item);
    });

    this.props.rooms.forEach((room) => {
      let roomReservations = [];

      reservations.forEach((reservation) => {
        if (reservation.room.value === room.id) {
          roomReservations.push(reservation);
        }
      });

      rooms.push(
        <Room
          key={`room${room.id}`}
          selectedDay={this.props.selectedDay}
          name={room.name}
          roomId={room.id}
          reservations={roomReservations}
          seats={room.seats}/>
      );
    });

    return rooms;
  },

  render() {
    let roomsHeight = (this.state.windowHeight - 90) + 'px';
    let roomsStyle = {
      height: roomsHeight
    };


    return (
      <div className="book">
        <div>
          <div className="labels">
            {this.renderLabels()}
          </div>
          <div className="rooms" style={roomsStyle}>
            <Time />
            {this.renderRooms()}
          </div>
        </div>
      </div>
    );
  }
});
