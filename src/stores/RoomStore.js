// Libraries
import Reflux from 'reflux';
import Moment from 'moment';

// Stores and Actions
import Actions from '../actions/RoomsActions';
import BookActions from '../actions/BookActions';
import BookStore from '../stores/BookStore';

export default Reflux.createStore({
  listenables: Actions,

  getInitialState() {
    return {
      items: [],
      loaded: false,
      reservationPageVisible: false,
      reservation: {
        person: null,
        roomId: null,
        startDate: null,
        endDate: null
      },
      selectedDay: null
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenTo(BookStore, this.callbackBookStore);
  },

  callbackBookStore(data) {
    this.data.selectedDay = data.selectedDay;
  },

  getResetvationDate() {
    console.log('RoomStore: getResetvationDate');
    return this.data.reservation;
  },

  onClickCancelReservationPage() {
    console.log('RoomStore: onClickCancelReservationPage');
    this.data.reservationPageVisible = false;
    this.trigger(this.data);
  },

  onClickPerson(person) {
    console.log('RoomStore: onClickPerson');
    this.data.reservation.person = person.id;
    this.trigger(this.data);
  },

  onSaveReservationCompleted() {
    console.log('RoomStore: onSaveReservationCompleted');
    this.data.reservationPageVisible = false;
    BookActions.changeSelectedDay(this.data.selectedDay);
    this.trigger(this.data);
  },

  onClickRoomRow(id, time) {
    console.log('RoomStore: onClickRoomRow');
    this.data.reservation.startDate = Moment(time).format();
    this.data.reservation.endDate = Moment(time).add(1, 'hours').format();
    this.data.reservation.roomId = id;
    // this.data.person = place holder for person data
    this.data.reservationPageVisible = true;
    this.trigger(this.data);
  },

  onFetchRoomsCompleted(res) {
    console.log('RoomStore: onFetchRoomsCompleted');
    this.data.items = res.objects;
    this.data.loaded = true;
    this.trigger(this.data);
  },

  onLoadRoomsFailed() {
  }
});
