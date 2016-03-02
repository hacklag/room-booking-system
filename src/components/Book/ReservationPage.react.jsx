// Libraries
import React from 'react';
import Moment from 'moment';

// Actions and Stores
import Actions from '../../actions/RoomsActions';

// Components
import Person from '../Person/Person.react';

// Material-UI
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import './css/reservation.scss';

export default React.createClass({

  displayName: 'ReservationPage',

  getInitialState() {
    return {
      start: Moment(this.props.reservation.startDate).toISOString(),
      end: Moment(this.props.reservation.endDate).toISOString(),
      title: '',
      complete: this.isComplete()
    };
  },

  getDefaultProps() {
    return {
      reservation: {
        person: null,
        company: null,
        color: '#000',
        startDate: Moment().toISOString(),
        endDate: Moment().toISOString(),
        roomId: null
      },
      people: [],
      companies: []
    };
  },

  componentDidMount() {
    console.info('ReservationPage::componentDidMount');
  },

  componentWillReceiveProps() {
    this.setState({complete: this.isComplete()});
  },

  componentWillUpdate() {
    console.info('ReservationPage::componentWillUpdate');
  },

  isComplete() {
    let reservation = this.props.reservation;
    let complete = false;

    if (reservation.person && reservation.roomId) {
      complete = true;
    }

    return complete;
  },

  handleStartChange(e) {
    let time = Moment(this.state.start).hours(e.target.value.substr(0, 2)).minutes(e.target.value.substr(3, 4));

    this.setState({start: time.toISOString()});
  },

  handleEndChange(e) {
    let time = Moment(this.state.end).hours(e.target.value.substr(0, 2)).minutes(e.target.value.substr(3, 4));

    this.setState({end: time.toISOString()});
  },

  handleTitleChange(e) {
    console.log(e.target.value);
    this.setState({title: e.target.value});
  },

  handleClickSave() {
    console.log('handleClickSave');
    let reservation = this.props.reservation;
    let data = {
      title: this.refs.title.getValue(),
      person: reservation.person,
      room: reservation.roomId,
      starttime: Moment(this.state.start).toISOString(),
      endtime: Moment(this.state.end).toISOString(),
      channel: 'reservations'
    };

    console.log(this.refs.title);
    console.log(data);

    Actions.saveReservation(data);
  },

  handleCancel() {
    Actions.clickCancelReservationPage();
  },

  renderTimeOptions() {
    let options = [];
    let timestamp = Moment().hours('00').minutes('00');
    let time = '';

    for (let i = 0; i < 48; i += 1) {
      time = Moment(timestamp).format('HH:mm');
      options.push(
        <option value={time} key={'option' + i}>
          {time}
        </option>
      );
      timestamp = Moment(timestamp).add(30, 'minutes');
    }

    return options;
  },

  renderPeople() {
    let people = [];
    let companies = this.props.companies;

    this.props.people.forEach((person) => {
      let company = companies.filter((val) => { return person.company.value === val.id; })[0];

      people.push(
        <Person
          className="reservation-page-person"
          key={`person${person.id}`}
          displayName={false}
          id={person.id}
          color={company.color}
          companyName={company.name}
          firstname={person.firstname}
          lastname={person.lastname}
          photoUrl={person.photo ? person.photo.value : null}/>
      );
    });
    return people;
  },

  render() {
    let selectedRoom = {};

    if (this.props.reservation.roomId === null) {
      selectedRoom.id = 8;
    } else {
      selectedRoom.id = this.props.reservation.roomId;
    }


    this.props.rooms.forEach((room) => {
      if (room.id === selectedRoom.id) {
        selectedRoom.name = room.name;
      }
    });

    console.log('selectedRoom', selectedRoom);
    console.log('this.props', this.props);

    let startTime = Moment(this.state.start).format('HH:mm');
    let endTime = Moment(this.state.end).format('HH:mm');
    let selectedPerson = this.props.reservation.person;
    let selectedPersonPhoto = '';

    this.props.people.forEach((person) => {
      if (person.id === selectedPerson) {
        selectedPerson = person;
        selectedPersonPhoto = person.photo.value;
        return;
      }
    });

    let selectedPersonName = selectedPerson ? selectedPerson.firstname : 'Janusz';

    let photoStyle = {
      float: 'left',
      height: '80px',
      width: '80px',
      borderRadius: '50%',
      border: '2px solid #fff'
    };
    let itemStyle = {
      borderLeft: '2px solid #dd1144',
      margin: '20px'
    };

    console.log('selectedPerson', selectedPerson);

    return (
      <Paper zDepth={5} className="reservation-page">
        <div className="reservation-menu">
          <div className="reservation-title">Room: {selectedRoom.name}</div>
          <FlatButton label="Cancel" onClick={this.handleCancel} />
        </div>

        <Divider />

        <Paper
          style={itemStyle}
          className="bookings-item"
          zDepth={1}>
          <div className="bookings-item-photo">
            <img style={photoStyle} src={selectedPersonPhoto} />
          </div>
          <div className="bookings-item-content">
              <p>
                <p>{selectedPersonName}</p>
                <select onChange={this.handleStartChange} value={startTime} >
                  {this.renderTimeOptions()}
                </select>
                &nbsp; to &nbsp;
                <select onChange={this.handleEndChange} value={endTime} >
                  {this.renderTimeOptions()}
                </select>
                <br />
                <TextField
                  onChange={this.handleTitleChange}
                  defaultValue={this.state.title}
                  ref="title"
                  hintText="Optional description"
                  multiLine={false}
                  rows={1} />
              </p>
          </div>
          <RaisedButton
            disabled={!this.state.complete}
            onClick={this.handleClickSave}
            label="Create" primary={true} />
        </Paper>

        <div className="reservation-people">
          <p>Please click on the person which looks like you</p>
          {this.renderPeople()}
        </div>

      </Paper>
    );
  }
});
