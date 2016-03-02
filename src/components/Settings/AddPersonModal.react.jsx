// Libraries
import React from 'react';
import Reflux from 'reflux';

import PeopleStore from '../../stores/PeopleStore';

import ModalActions from '../../actions/ModalActions';
import PeopleActions from '../../actions/PeopleActions';
import CompanyActions from '../../actions/CompanyActions';

import Dropzone from 'react-dropzone';

import './css/addPersonModal.scss';

import {TextField, SelectField, MenuItem, FlatButton, Paper, Divider, RaisedButton} from 'material-ui';

export default React.createClass({

  displayName: 'addPersonModal',

  propTypes: {
    people: React.PropTypes.array.isRequired,
    companies: React.PropTypes.array.isRequired
  },

  mixins: [
    Reflux.connect(PeopleStore)
  ],

  getDefaultProps() {
    return {
      people: [],
      companies: []
    };
  },

  getInitialState() {
    return {
      company: this.props.companies[0].id
    };
  },

  componentDidMount() {
    CompanyActions.fetchCompanies();
    console.info('addPersonModal::componentDidMount');
  },

  componentWillUpdate() {
    console.info('addPersonModal::componentWillUpdate');
  },

  onDrop(files) {
    this.setState({
      files,
      file: files[0]
    });
  },

  onOpenClick() {
    this.refs.dropzone.open();
  },

  handleFirstNameChange(firstname) {
    this.setState({firstname: firstname.target.value});
  },

  handleLastNameChange(lastname) {
    this.setState({lastname: lastname.target.value});
  },

  handleCompanyChange(event, index, value) {
    this.setState({
      company: value
    });
  },

  handleSave() {
    let person = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      company: Number(this.state.company),
      photo: {
        filename: this.state.file.name,
        data: this.state.file
      }
    };

    PeopleActions.addPerson(person);
    this.handleCancel();
  },

  handleCancel() {
    ModalActions.clickCancel();
  },

  renderOptionFields() {
    return this.props.companies
      .map((company) => <MenuItem
                          key={company.id}
                          value={company.id}
                          label={company.name}>
                            {company.name}
                        </MenuItem>);
  },

  renderPhoto() {
    let photo = [];

    this.state.files.map((file) => {
      photo.push(<img src={file.preview} />);
    });
    return photo;
  },

  render() {
    return (
      <Paper zDepth={5} className="reservation-page">
        <div className="reservation-menu">
          <div className="reservation-title">Add Person</div>
          <FlatButton label="Cancel" onClick={this.handleCancel} />
        </div>

        <Divider />

          <div className="reservation-content">
            <div className="add-person-wrapper">
              <div className="add-person-details">
                <div className="person-photo">
                  {this.state.files ? this.renderPhoto() : null}
                </div>
                <TextField
                  className="add-person-textfield"
                  ref="firstname"
                  type="text"
                  floatingLabelText="Name"
                  onChange={this.handleFirstNameChange} />
                <TextField
                  ref="lastname"
                  type="text"
                  floatingLabelText="Surname"
                  onChange={this.handleLastNameChange} />
                <SelectField
                  className="add-person-selectfield"
                  ref="company"
                  type="number"
                  value={this.state.company}
                  onChange={this.handleCompanyChange}>
                  {this.renderOptionFields()}
                </SelectField>
              </div>
              <div className="add-person-create-button">
                <RaisedButton
                  onClick={this.handleSave}
                  label="Create" primary={true} />
              </div>
              <div>
                <Dropzone
                  className="add-person-dropzone"
                  ref="dropzone"
                  onDrop={this.onDrop}
                  multiple={false}>
                  <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
              </div>
            </div>
          </div>
      </Paper>
    );
  }
});
