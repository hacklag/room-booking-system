// Libraries
import React from 'react';
import Reflux from 'reflux';
import PersonList from '../Person/PersonList.react';

import PeopleStore from '../../stores/PeopleStore';
import CompanyStore from '../../stores/CompanyStore';
import ModalStore from '../../stores/ModalStore';

import PeopleActions from '../../actions/PeopleActions';
import CompanyActions from '../../actions/CompanyActions';


export default React.createClass({

  displayName: 'Settings',

  mixins: [
    Reflux.connect(PeopleStore, 'people'),
    Reflux.connect(CompanyStore, 'company'),
    Reflux.connect(ModalStore, 'modal')
  ],

  componentDidMount() {
    console.info('Settings::componentDidMount');
    CompanyActions.fetchCompanies();
    PeopleActions.fetchPeople();
  },

  componentWillUpdate() {
    console.info('Settings::componentWillUpdate');
  },

  render() {
    return (
      <div>
        <PersonList/>
      </div>
    );
  }
});
