import React from 'react';
import _ from 'lodash';
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

    _.debounce(this.handleScroll, 100)();
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUpdate() {
    console.info('Book::componentWillUpdate');
  },

  handleScroll() {
    let node = document.getElementsByClassName('rooms')[0];

    node.scrollTop = 390;
  },

  handleResize() {
    this.setState({windowHeight: window.innerHeight});
  },

  renderLabels() {
    return _.map(this.props.rooms, (room) => {
      return <div key={room.id} className="label">{room.name}</div>;
    });
  },

  renderRooms() {
    const {people} = this.props.data;
    const companies = this.props.data.companies ? this.props.data.companies : [];
    const reservations = _.map(this.props.data.items, (reservation) => {
      let item = Object.create(reservation);

      item.person = _.filter(people, (el) => item.person.value === el.id)[0];
      item.company = _.filter(companies, (el) => item.person.company.value === el.id)[0];
      return item;
    });

    return _.map(this.props.rooms, (room) => {
      const roomReservations = _.filter(reservations, (reservation) => reservation.room.value === room.id);

      return (
        <Room
          key={`room${room.id}`}
          selectedDay={this.props.selectedDay}
          name={room.name}
          roomId={room.id}
          reservations={roomReservations}
          seats={room.seats}/>
      );
    });
  },

  render() {
    const roomsHeight = (this.state.windowHeight - 90) + 'px';

    return (
      <div className="book">
        <div>
          <div className="labels">
            {this.renderLabels()}
          </div>
          <div className="rooms" style={{height: roomsHeight}}>
            <Time />
            {this.renderRooms()}
          </div>
        </div>
      </div>
    );
  }
});
