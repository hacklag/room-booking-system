// Libraries
import React from 'react';
import Reflux from 'reflux';

import PeopleStore from '../../stores/PeopleStore';
import CompanyStore from '../../stores/CompanyStore';
import ModalStore from '../../stores/ModalStore';

import PeopleActions from '../../actions/PeopleActions';
import CompanyActions from '../../actions/CompanyActions';
import ModalActions from '../../actions/ModalActions';

import AddPersonModal from '../Settings/AddPersonModal.react';
import Person from '../Person/Person.react';
import {RaisedButton} from 'material-ui';

import './css/personList.scss';

export default React.createClass({

  displayName: 'PersonList',

  mixins: [
    Reflux.connect(PeopleStore, 'people'),
    Reflux.connect(CompanyStore, 'company'),
    Reflux.connect(ModalStore, 'modal')
  ],

  componentDidMount() {
    console.info('PersonList::componentDidMount');
    CompanyActions.fetchCompanies();
    PeopleActions.fetchPeople();
  },

  componentWillUpdate() {
    console.info('PersonList::componentWillUpdate');
  },

  handleAddClick() {
    ModalActions.clickShowModal();
  },

  renderAddPersonModal() {
    if (!this.state.modal.renderAddPersonModal) {
      return null;
    }
    return (
      <AddPersonModal people={this.state.people.items} companies={this.state.company.items} />
    );
  },

  renderPersons() {
    let people = this.state.people.items;
    let persons = [];

    people.forEach((person) => {
      persons.push(
        <Person
          key={person.id}
          firstname={person.firstname}
          lastname={person.lastname}
          photoUrl={person.photo ? person.photo.value : null}/>
      );
    });

    return persons;
  },

  render() {
    let numberOfPeople = this.state.people.items.length;

    return (
        <div className='person-list'>
          <div className='person-list-menu'>
            <p className='title'>Hurray! we could have a party for {numberOfPeople} people ;)</p>
            <RaisedButton
              onClick={this.handleAddClick}
              label="Add Person"
              primary={true} />
          </div>
          <div>
            {this.renderAddPersonModal()}
          </div>
          <div className='persons'>
          {this.renderPersons()}
          </div>
        </div>
    );
  }
});
