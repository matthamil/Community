import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { browserHistory } from 'react-router';
import NewEvent from '../components/NewEvent';

class NewEventContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organizationId: null,
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      date: null,
      startTime: null,
      endTime: null,
      validationErrors: new Map()
    };

    this.handleValidateForm = this.handleValidateForm.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChangeFormInput = this.handleOnChangeFormInput.bind(this);
    this.handleOnChangeOrganization = this.handleOnChangeOrganization.bind(this);
    this.handleOnChangeState = this.handleOnChangeState.bind(this);
    this.handleOnCancel = this.handleOnCancel.bind(this);
  }

  handleOnChangeFormInput(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }

  handleOnChangeOrganization(organization) {
    this.setState({
      organizationId: organization ? organization.value : null
    });
  }

  handleOnChangeState(state) {
    this.setState({
      state: state ? state.value : null
    });
  }



  handleValidateForm() {
    const { userOrganizations } = this.props;
    const validationErrors = new Map();
    if (this.state.organizationId === null) {
      validationErrors.set('organizationId', 'Organization ID is required.');
    }
    // If the organization selected is not one of the organizer's organizations
    else if (!userOrganizations.find(org => org.organizationId === this.state.organizationId)) {
      validationErrors.set('organizationId', 'The Organization ID selected is not one of your organizations.');
    }
    if (this.state.name === '') {
      validationErrors.set('name', 'Name is required.');
    }
    if (this.state.address === '') {
      validationErrors.set('address', 'Address is required.');
    }
    if (this.state.city === '') {
      validationErrors.set('city', 'City is required.');
    }
    if (this.state.state === '' || this.state.state === null) {
      validationErrors.set('state', 'State is required.');
    }
    if (this.state.zipCode === '') {
      validationErrors.set('zipCode', 'ZipCode is required.');
    }
    if (this.state.date === null) {
      validationErrors.set('date', 'Date is required.');
    }
    if (this.state.startTime === null) {
      validationErrors.set('startTime', 'Start time is required.');
    }
    if (this.state.endTime === null) {
      validationErrors.set('endTime', 'End Time is required.');
    }
    if (this.state.description === '') {
      validationErrors.set('description', 'Description is required.');
    }

    this.setState({
      validationErrors
    });

    return validationErrors.size === 0;
  }

  handleOnSubmit() {
    const formValidated = this.handleValidateForm();
    if (formValidated) {
      this.props.postEvent({
        organizationId: this.state.organizationId,
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode,
        date: `${this.state.date} ${this.state.startTime}:00`,
        startTime: `${this.state.date} ${this.state.startTime}:00`,
        endTime: `${this.state.date} ${this.state.endTime}:00`
      });
    }
  }

  handleOnCancel() {
    browserHistory.push('/events/');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userOrganizations === undefined) return;
    const formattedOrganizations = nextProps.userOrganizations.reduce((all, organization) => {
      all.push({
        label: organization.name,
        value: organization.organizationId
      });
      return all;
    }, []);

    this.setState({
      userOrganizations: formattedOrganizations
    });
  }

  componentWillMount() {
    // if (!this.props.loggedIn) {
    //   browserHistory.push('/');
    // }
  }

  render() {
    return (
      <NewEvent
        validationErrors={this.state.validationErrors}
        onChange={this.handleOnChangeFormInput}
        onSubmit={this.handleOnSubmit}
        userOrganizations={this.state.userOrganizations}
        selectedOrganization={this.state.organizationId}
        selectedState={this.state.state}
        onChangeState={this.handleOnChangeState}
        onChangeOrganization={this.handleOnChangeOrganization}
        onCancel={this.handleOnCancel}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ account, organization }) => ({
  loggedIn: account.loggedIn,
  userOrganizations: organization.userOrganizations
});
export default connect(mapStateToProps, mapDispatchToProps)(NewEventContainer);