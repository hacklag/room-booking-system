// Libraries
import React from 'react';
import Reflux from 'reflux';
import Syncano from '../../utils/syncano';

// Stores and BookActions
import BookActions from '../../actions/BookActions';
import RoomsActions from '../../actions/RoomsActions';
import CompanyActions from '../../actions/CompanyActions';
import PeopleActions from '../../actions/PeopleActions';

import RoomStore from '../../stores/RoomStore';
import BookStore from '../../stores/BookStore';

// Components
import Calendar from '../Calendar/Calendar.react';
import Book from '../Book/Book.react';
import ReservationPage from '../Book/ReservationPage.react';

export default React.createClass({

  displayName: 'Dashboard',

  mixins: [
    Reflux.connect(BookStore, 'books'),
    Reflux.connect(RoomStore, 'rooms')
  ],

  componentDidMount() {
    console.info('Dashboard::componentDidMount');
    CompanyActions.fetchCompanies();
    PeopleActions.fetchPeople();
    RoomsActions.fetchRooms();
    BookActions.fetchReservations(true);
    let reservationsChannel = Syncano.channel('reservations').watch();

    reservationsChannel.on('create', this.onChangeListener);
    reservationsChannel.on('update', this.onChangeListener);
    reservationsChannel.on('delete', this.onChangeListener);
  },

  componentWillUpdate() {
    console.info('Dashboard::componentWillUpdate');
  },

  onChangeListener() {
    BookActions.loadCurrentReservations(this.state.books.selectedDay);
  },

  renderReservationPage() {
    if (this.state.rooms.reservationPageVisible) {
      return (
        <ReservationPage
          reservation={this.state.rooms.reservation}
          companies={this.state.books.companies}
          people={this.state.books.people}
          rooms={this.state.rooms.items}
          selectedRoom={this.state.books.selectedRoom}/>
      );
    }
  },

  render() {
    return (
      <div>
        <Calendar
          rooms={this.state.rooms.items}
          loading={this.state.books.loading}
          data={this.state.books}/>
        <Book
          rooms={this.state.rooms.items}
          data={this.state.books}
          selectedDay={this.state.books.selectedDay}/>
        {this.renderReservationPage()}
      </div>
    );
  }
});
