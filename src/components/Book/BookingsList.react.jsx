import React from 'react';
// import Reflux from 'reflux';
import moment from 'moment';
import _ from 'lodash';

// stores, actions
import BookActions from '../../actions/BookActions';

// Components
import Loader from '../../Utils/Loader.react';
import {IconButton, Paper} from 'material-ui';
import DeleteDialog from './DeleteReservationDialog';

import './css/bookingsList.scss';

export default React.createClass({

  displayName: 'BookingsList',

  getDefaultProps() {
    return {
      data: {
        items: []
      }
    };
  },

  getInitialState() {
    return {
      clickedItem: null,
      windowHeight: window.innerHeight
    };
  },

  componentDidMount() {
    console.info('Bookings::componentDidMount');
    window.addEventListener('resize', this.handleResize);
  },

  handleResize() {
    this.setState({windowHeight: window.innerHeight});
  },

  handleClickDelete(item) {
    BookActions.deleteReservation(item.id);
  },

  showDeleteDialog(item) {
    this.setState({
      clickedItem: item
    }, this.refs.deleteDialog.toggleDialog);
  },

  renderListItems() {
    if (!this.props.data.items || !this.props.data.companies || !this.props.data.people) {
      return null;
    }

    const photoStyle = {
      float: 'left',
      height: '30px',
      width: '30px',
      borderRadius: '50%',
      border: '2px solid #fff'
    };

    return _.map(this.props.data.items, (item) => {
      const person = _.find(this.props.data.people, 'id', item.person.value);
      const room = _.find(this.props.rooms, 'id', item.room.value);
      const company = _.find(this.props.data.companies, 'id', person.company.value);
      const itemStyle = {
        borderLeft: '2px solid ' + company.color
      };

      return (
        <Paper
          key={item.id}
          style={itemStyle}
          className="bookings-item"
          zDepth={1}>
          <div className="bookings-item-photo">
            <img style={photoStyle} src={person.photo.value}/>
          </div>
          <div className="bookings-item-content">
            <p>
              {person.firstname}
              <br />{moment(item.starttime.value).format('HH:mm')} - {moment(item.endtime.value).format('HH:mm')}
              <br />{room.name} ({room.seats})
              <br />{item.title}
            </p>
          </div>
          <IconButton
            className="trash-icon"
            iconStyle={{color: '#777'}}
            onTouchTap={() => this.showDeleteDialog(item)}
            tooltip="Delete"
            iconClassName="material-icons">
            delete
          </IconButton>
        </Paper>
      );
    });
  },

  render() {
    const state = this.state;
    let bookingsWrapperHeight = (this.state.windowHeight - 360) + 'px';
    let bookingsStyle = {
      height: bookingsWrapperHeight
    };

    return (
      <div>
        <DeleteDialog
          bodyClassName="dialog-body"
          title="Delete reservation"
          handleConfirm={() => this.handleClickDelete(state.clickedItem)}
          ref="deleteDialog">
          <span>Are you sure you want to delete reservation </span>
          <span className="dialog-body-reservation-name">{state.clickedItem ? state.clickedItem.title : null}</span>?
        </DeleteDialog>
        <div className="bookings" style={bookingsStyle}>
          <Loader loading={this.props.loading}/>
          <ul>
            {this.renderListItems()}
          </ul>
        </div>
      </div>
    );
  }
});
