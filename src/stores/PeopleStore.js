// Libraries
import Reflux from 'reflux';

// Actions and Stores
import Actions from '../actions/PeopleActions';
import Settings from '../actions/SettingsActions';

export default Reflux.createStore({
  listenables: [Actions, Settings],

  getInitialState() {
    return {
      items: []
    };
  },

  init() {
    this.data = this.getInitialState();
  },

  onClickShowModal() {

  },

  onFetchPeopleCompleted(res) {
    console.log('PeopleStore: onFetchPeopleCompleted');
    this.data.items = res.objects;
    this.trigger(this.data);
  },

  onFetchPeopleFailed() {
    console.log('PeopleStore: fetch people failed');
  },

  onAddPersonCompleted() {
    console.log('PeopleStore: onAddPersonCompleted');
    Actions.fetchPeople();
  }

});
