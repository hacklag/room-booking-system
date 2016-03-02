import React from 'react';
import Moment from 'moment';

import './css/time.scss';

export default React.createClass({

  displayName: 'TimeLine',

  getDefaultProps() {
    return {
      lineColor: '#E00F44',
      zeroPosition: 5
    };
  },

  getInitialState() {
    return {
      topPosition: (Moment().hours() * 60) + Moment().minutes() - this.props.zeroPosition
    };
  },

  componentWillMount() {
    setInterval(() => {
      this.setState({
        topPosition: (Moment().hours() * 60) + Moment().minutes() - this.props.zeroPosition
      });
    }, 60000);
  },

  render() {
    let timelineStyle = {
      top: this.state.topPosition,
      borderLeft: `5px solid ${this.props.lineColor}`
    };

    return (
      <div>
        <div
          style={timelineStyle}
          className="time-triangle">
        </div>
      </div>
    );
  }
});
