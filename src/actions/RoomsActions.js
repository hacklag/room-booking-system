import Reflux from 'reflux';

import Syncano from '../utils/syncano';

let Actions = Reflux.createActions({
  clickRoomRow: {},

  clickCancelReservationPage: {},

  clickPerson: {},

  saveReservation: {
    children: ['completed', 'failed'],
    asyncResult: true
  },

  fetchRooms: {
    children: ['completed', 'failed'],
    asyncResult: true
  }
});

/* eslint-disable */
Actions.fetchRooms.listen(function () {
  Syncano.class('room')
    .dataobject()
    .list()
    .then(this.completed)
    .catch(this.failed);
});

Actions.saveReservation.listen(function (payload) {
  Syncano.class('book')
    .dataobject()
    .add(payload)
    .then(this.completed)
    .catch(this.failed);
});

export default Actions;