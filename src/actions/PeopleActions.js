import Reflux from 'reflux';
import Syncano from '../Utils/syncano';

let Actions = Reflux.createActions({
  fetchPeople: {
    asyncResult: true,
    children: ['completed', 'failed']
  },
  addPerson: {
    asyncResult: true,
    children: ['completed', 'failed']
  }
});


/* eslint-disable */
Actions.fetchPeople.listen(function() {
  Syncano.class('person')
    .dataobject()
    .list()
    .then(this.completed)
    .catch(this.failed);
});

Actions.addPerson.listen(function(data) {
  Syncano.class('person')
    .dataobject()
    .add(data)
    .then(this.completed)
    .catch(this.failed);
});


export default Actions;
