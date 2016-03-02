// Libraries
import React from 'react';

// Components
import PersonIcon from './PersonIcon.react';
import RoomsActions from '../../actions/RoomsActions';
// import Actions from '../actions/PeopleActions';

import './css/person.scss';

export default React.createClass({

  displayName: 'Person',

  getDefaultProps() {
    return {
      firstname: 'Typowy',
      lastname: 'Janusz',
      photoUrl: '',
      displayName: true
    };
  },

  componentDidMount() {
    console.info('Person::componentDidMount');
  },

  componentWillUpdate() {
    console.info('Person::componentWillUpdate');
  },

  handleClick() {
    RoomsActions.clickPerson(this.props);
  },

  render() {
    return (
      <div className="person" onClick={this.handleClick} >
        <PersonIcon
          color={this.props.color}
          photoUrl={this.props.photoUrl}/>
        <span>{this.props.displayName ? this.props.firstname : ''} </span>
        <span></span>
      </div>
    );
  }
});
