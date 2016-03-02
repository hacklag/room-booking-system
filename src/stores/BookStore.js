// Libraries
import Reflux from 'reflux';
import Moment from 'moment';

// Stores and Actions
import Actions from '../actions/BookActions';
import PeopleStore from '../stores/PeopleStore';
import CompanyStore from '../stores/CompanyStore';

export default Reflux.createStore({
  listenables: Actions,

  getInitialState() {
    return {
      items: [],
      people: [],
      companies: [],
      selectedDay: new Date().getTime(),
      loading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenTo(PeopleStore, this.callbackPeopleStore);
    this.listenTo(CompanyStore, this.callbackCompanyStore);
  },

  callbackPeopleStore(res) {
    console.log('BookStore: callbackPeopleStore');
    this.data.people = res.items;
  },

  callbackCompanyStore(res) {
    console.log('BookStore: callbackCompanyStore');
    this.data.companies = res.items;
  },

  onFetchReservationsCompleted(response) {
    this.data.loading = false;
    this.data.items = response.objects;
    this.trigger(this.data);
    console.log('BookStore: onFetchReservationsCompleted');
  },

  onFetchReservationsFailed() {
    console.log('BookStore: onFetchReservationsFailed');
  },

  onLoadReservationsCompleted(response) {
    this.data.loading = false;
    this.data.items = response.objects;
    this.trigger(this.data);
    console.log('BookStore: onLoadReservationsCompleted');
  },

  onLoadCurrentReservationsCompleted(response) {
    this.data.loading = false;
    this.data.items = response.objects;
    this.trigger(this.data);
  },

  onDeleteReservationCompleted() {
    this.onChangeSelectedDay(this.data.selectedDay);
  },

  onChangeSelectedDay(day) {
    console.log('BookStore: onChangeSelectedDay');
    this.data.loading = true;
    this.data.selectedDay = day;
    this.trigger(this.data);
    let greaterThan = Moment(day).format('YYYY-MM-DD') + 'T00:00Z';
    let lessThan = Moment(day).format('YYYY-MM-DD') + 'T23:59Z';
    let filter = {query: {starttime: {_gt: greaterThan, _lt: lessThan}}};

    Actions.loadReservations(filter);
  },

  callbackSaveReservation() {
    console.log('BookStore: callbackSaveReservation');
    this.trigger(this.data);
  }
});
