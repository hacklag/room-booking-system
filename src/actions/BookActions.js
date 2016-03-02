import Reflux from 'reflux';
import Moment from 'moment';

import Syncano from '../Utils/syncano';

let Actions = Reflux.createActions({
  changeSelectedDay: {
  },

  fetchReservations: {
    asyncResult: true,
    children: ['completed', 'failed']
  },

  loadReservations: {
    asyncResult: true,
    children: ['completed', 'failed']
  },

  loadCurrentReservations: {
    asyncResult: true,
    children: ['completed', 'failed']
  },

  clickRoomRow: {
  },

  clickCancelReservationPage: {
  },

  clickSaveReservation: {
  },

  deleteReservation: {
    asyncResult: true,
    children: ['completed', 'failed']
  },

  loadRooms: {
    children: ['completed', 'failed'],
    asyncResult: true
  },
  getCompanies: {
    asyncResult: true,
    children: ['completed', 'failed']
  }
});

let greaterThan = Moment().format('YYYY-MM-DD') + 'T00:00Z';
let lessThan = Moment().format('YYYY-MM-DD') + 'T23:59Z';
let filter = {query: {starttime: {_gt: greaterThan, _lt: lessThan}}};

/* eslint-disable */
Actions.fetchReservations.listen(function(withFilter = false) {
  Syncano.class('book')
    .dataobject()
    .list(withFilter ? filter : null)
    .then(this.completed)
    .catch(this.failed);
});

Actions.loadReservations.listen(function(filter) {
  Syncano.class('book')
    .dataobject()
    .list(filter)
    .then(this.completed)
    .catch(this.failed);
});

Actions.loadCurrentReservations.listen(function(day) {
  let greaterThan = Moment(day).format('YYYY-MM-DD') + 'T00:00Z';
  let lessThan = Moment(day).format('YYYY-MM-DD') + 'T23:59Z';
  let filter = {query: {starttime: {_gt: greaterThan, _lt: lessThan}}};

  Syncano.class('book')
    .dataobject()
    .list(filter)
    .then(this.completed)
    .catch(this.failed);
});

Actions.deleteReservation.listen(function(id) {
  Syncano.class('book')
    .dataobject(id)
    .delete()
    .then(this.completed)
    .catch(this.failed);
});


export default Actions;
