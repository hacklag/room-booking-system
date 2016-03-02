// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import reactTap from 'react-tap-event-plugin';

// Components
import TopBar from './components/TopBar/TopBar.react';
import Dashboard from './components/Dashboard/Dashboard.react';
import SettingsPage from './components/Settings/SettingsPage.react';
import People from './components/Settings/People.react';
import Companies from './components/Settings/Companies.react';
import Rooms from './components/Settings/Rooms.react';

// Style
import '../src/assets/css/main.scss';

reactTap();

const App = React.createClass({

  render() {
    return (
      <div>
        <TopBar />
        <div className="wrapper">{this.props.children}</div>
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="settings" component={SettingsPage}>
        <Route path="people" component={People}/>
        <Route path="companies" component={Companies}/>
        <Route path="rooms" component={Rooms}/>
        <IndexRoute component={People}/>
      </Route>
    </Route>
  </Router>), document.getElementById('app'));
