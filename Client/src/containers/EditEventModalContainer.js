import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import EditEventModal from '../components/EditEventModal';
import Modal from 'react-modal';
import moment from 'moment';

class EditEventModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const validationErrors = new Map();
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
    const { eventId } = this.props.event;
    if (formValidated) {
      this.props.patchEventById(eventId, {
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode,
        date: `${this.state.date.split('T')[0]} ${this.state.startTime}:00`,
        startTime: `${this.state.date.split('T')[0]} ${this.state.startTime}:00`,
        endTime: `${this.state.date.split('T')[0]} ${this.state.endTime}:00`
      });
    }
    this.props.onCancel();
  }

  componentWillReceiveProps(nextProps) {
    const { event } = this.props;
    this.setState({
      name: event.name,
      description: event.description,
      date: event.date,
      startTime: moment(event.startTime).format('HH:mm'),
      endTime: moment(event.endTime).format('HH:mm'),
      address: event.address,
      city: event.city,
      state: event.state,
      zipCode: event.zipCode,
      validationErrors: new Map()
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isEditing}
        contentLabel="Edit Job"
        onRequestClose={this.props.onCancel}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)'
          },
          content: {
            padding: '0',
            bottom: '0 !important',
            border: 'none',
            left: '0',
            right: '0',
            margin: '0 auto',
            maxWidth: '33vw'
          }
        }}>
        <EditEventModal
          event={this.props.event}
          validationErrors={this.state.validationErrors}
          onChange={this.handleOnChangeFormInput}
          onSubmit={this.handleOnSubmit}
          selectedState={this.state.state}
          onChangeState={this.handleOnChangeState}
          onCancel={this.props.onCancel}/>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(EditEventModalContainer);