import React from 'react';
import _ from 'lodash';

import {Dialog, FlatButton} from 'material-ui';

export default React.createClass({

  displayName: 'DeleteReservationDialog',

  propTypes: {
    // function called when Confirm button is clicked
    handleConfirm: React.PropTypes.func,
    // Title of the dialog
    title: React.PropTypes.string
  },

  getInitialState() {
    return {
      open: false
    };
  },

  handleConfirm() {
    if (_.isFunction(this.props.handleConfirm)) {
      this.props.handleConfirm();
    }
    this.toggleDialog();
  },

  toggleDialog() {
    console.error('toggle');
    this.setState({
      open: !this.state.open
    });
  },

  render() {
    const dialogActions = [
      <FlatButton
        onTouchTap={this.toggleDialog}
        label="Cancel" />,
      <FlatButton
        onTouchTap={this.handleConfirm}
        label="Confirm"
        primary={true} />
    ];

    return (
      <Dialog
        {...this.props}
        onRequestClose={this.toggleDialog}
        actions={dialogActions}
        repositionOnUpdate={true}
        open={this.state.open}>
        {this.props.children}
      </Dialog>

    );
  }
});
