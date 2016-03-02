// Libraries
import React from 'react';

export default React.createClass({

  displayName: 'PersonIcon',

  getDefaultProps() {
    return {
      firstname: '',
      lastname: '',
      photoUrl: ''
    };
  },

  componentDidMount() {
    console.info('PersonIcon::componentDidMount');
  },

  componentWillUpdate() {
    console.info('PersonIcon::componentWillUpdate');
  },

  render() {
    let customStyle = {
      borderColor: this.props.color
    };

    return (
      <div className="person-icon">
        {this.props.photo}
        <img style={customStyle} src={this.props.photoUrl} />
      </div>
    );
  }
});
