// Libraries
import Reflux from 'reflux';

// Stores and Actions
import Actions from '../actions/ModalActions';

export default Reflux.createStore({
  listenables: Actions,

  getInitialState() {
    return {
      items: [],
      loaded: false,
      firstname: null,
      lastname: null,
      company: null,
      photo: null
    };
  },

  init() {
    // init should containe only starting values and then getRooms should be an Action which fetch DO and save it in
    // `this.data` and trigger data into components
    this.data = this.getInitialState();
  },

  onClickCancel() {
    this.data.renderAddPersonModal = false;
    this.trigger(this.data);
  },

  onClickShowModal() {
    this.data.renderAddPersonModal = true;
    this.trigger(this.data);
  }
});
