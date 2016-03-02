import Reflux from 'reflux';
import Syncano from '../Utils/syncano';

let Actions = Reflux.createActions({
  fetchCompanies: {
    asyncResult: true,
    children: ['completed', 'failed']
  }
});


/* eslint-disable */
Actions.fetchCompanies.listen(function() {
  Syncano.class('company')
    .dataobject()
    .list()
    .then(this.completed)
    .catch(this.failed);
});


export default Actions;
