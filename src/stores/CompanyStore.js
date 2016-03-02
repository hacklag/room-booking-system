// Libraries
import Reflux from 'reflux';

// Stores and Actions
import Actions from '../actions/CompanyActions';

export default Reflux.createStore({
  listenables: Actions,

  getInitialState() {
    return {
      items: [],
      loading: true
    };
  },

  init() {
    this.data = this.getInitialState();
  },

  onFetchCompaniesCompleted(response) {
    this.data.loading = false;
    this.data.items = response.objects;
    this.trigger(this.data);
    console.log('CompanyStore: onFetchCompaniesCompleted');
  }

});
