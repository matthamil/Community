import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import NewEventMember from '../components/NewEventMember';

class NewEventMemberContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: null,
      jobTitle: '',
      description: '',
      startTime: null,
      endTime: null,
      validationErrors: new Map()
    };

    this.handleValidateForm = this.handleValidateForm.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChangeFormInput = this.handleOnChangeFormInput.bind(this);
    this.handleOnClickCancel = this.handleOnClickCancel.bind(this);
  }

  handleOnChangeFormInput(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }

  handleValidateForm() {
    const validationErrors = new Map();
    if (this.state.jobTitle === '') {
      validationErrors.set('jobTitle', 'Job title is required.');
    }
    if (this.state.description === '') {
      validationErrors.set('description', 'Description is required.');
    }
    if (this.state.startTime === null) {
      validationErrors.set('startTime', 'Start time is required.');
    } else if (this.state.startTime > this.state.endTime) {
      validationErrors.set('startTime', 'Start time must be before the end time.');
    }
    if (this.state.endTime === null) {
      validationErrors.set('endTime', 'End Time is required.');
    }

    this.setState({
      validationErrors
    });

    return validationErrors.size === 0;
  }

  handleOnSubmit() {
    const formValidated = this.handleValidateForm();
    if (formValidated) {
      this.props.postEventMember({
        eventId: this.props.event.eventId,
        jobTitle: this.state.jobTitle,
        description: this.state.description,
        startTime: `${this.props.event.date}`,
        endTime: `${this.props.event.date.split('T')[0]}${'T'.concat(this.state.endTime)}:00`,
        chatMuted: false,
        attendeePoints: 250 // Feature planned to be implemented in version 2
      });
      this.props.onClickCancel();
    }
  }

  handleOnClickCancel() {
    this.props.onClickCancel();
  }

  render() {
    return (
      <NewEventMember
        validationErrors={this.state.validationErrors}
        onChange={this.handleOnChangeFormInput}
        onCancel={this.handleOnClickCancel}
        onSubmit={this.handleOnSubmit}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(NewEventMemberContainer);