import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import NewEventMember from '../components/NewEventMember';
import moment from 'moment';

class NewEventMemberContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.validateTime = this.validateTime.bind(this);
    this.handleOnSubmitEdit = this.handleOnSubmitEdit.bind(this);
  }

  handleOnChangeFormInput(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }

  handleValidateForm() {
    const validationErrors = new Map();
    if (this.state.jobTitle.trim() === '' && this.props.eMember === undefined) {
      validationErrors.set('jobTitle', 'Required.');
    }
    if (this.state.description.trim() === '' && this.props.eMember === undefined) {
      validationErrors.set('description', 'Required.');
    }
    if (this.state.startTime === null && this.props.eMember === undefined) {
      validationErrors.set('startTime', 'Required.');
    } else if (this.validateTime().size) {
      this.validateTime().forEach((value, key) => {
        validationErrors.set(key, value);
      });
    }
    if (this.state.endTime === null && this.props.eMember === undefined) {
      validationErrors.set('endTime', 'Required.');
    }

    this.setState({
      validationErrors
    });

    return validationErrors.size === 0;
  }

  validateTime() {
    const eventStartHour = parseInt(this.props.event.startTime.split('T')[1].split(':')[0], 10);
    const eventStartMinute = parseInt(this.props.event.startTime.split('T')[1].split(':')[1], 10);
    const eventEndHour = parseInt(this.props.event.endTime.split('T')[1].split(':')[0], 10);
    const eventEndMinute = parseInt(this.props.event.endTime.split('T')[1].split(':')[1], 10);

    const { eMember } = this.props;
    const startHour = this.state.startTime ? parseInt(this.state.startTime.split(':')[0], 10) : parseInt(eMember.startTime.split('T')[1].split(':')[0], 10);
    const startMinute = this.state.startTime ? parseInt(this.state.startTime.split(':')[1], 10) : parseInt(eMember.startTime.split('T')[1].split(':')[1], 10);
    const endHour = this.state.endTime ? parseInt(this.state.endTime.split(':')[0], 10) : parseInt(eMember.endTime.split('T')[1].split(':')[0], 10);
    const endMinute = this.state.endTime ? parseInt(this.state.endTime.split(':')[1], 10) : parseInt(eMember.endTime.split('T')[1].split(':')[1], 10);

    const validationErrors = new Map();

    // eslint-disable-next-line no-mixed-operators
    if (startHour < eventStartHour || startHour === eventStartHour && startMinute < eventStartMinute) {
      validationErrors.set('startTime', 'Must be when or after the event starts.');
    } else if (startHour > eventEndHour) {
      validationErrors.set('startTime', 'Must start before the event is over.')
    // eslint-disable-next-line no-mixed-operators
    } else if (startHour === eventStartHour && endMinute > eventEndMinute) {
      validationErrors.set('endTime', 'Can\'t end after the event is over.' )
    } else if (endHour > eventEndHour) {
      validationErrors.set('endTime', 'Position can\'t end after the event.');
    } else if (startHour > endHour) {
      validationErrors.set('startTime', 'Must be before the end time.');
    // eslint-disable-next-line no-mixed-operators
    } else if (startHour === eventEndHour && startMinute && eventEndMinute) {
      validationErrors.set('startTime', 'Cannot schedule a position at the end of the event.')
    // eslint-disable-next-line no-mixed-operators
    } else if (endHour - startHour === 0 && endMinute - startMinute === 0) {
      validationErrors.set('startTime', 'Can\'t match end time.');
    }

    return validationErrors;
  }

  handleOnSubmit() {
    const formValidated = this.handleValidateForm();
    if (formValidated) {
      setTimeout(() => {
        this.props.postEventMember({
          eventId: this.props.eventId,
          jobTitle: this.state.jobTitle.trim(),
          description: this.state.description.trim(),
          startTime: `${this.props.event.date.split('T')[0]}${'T'.concat(this.state.startTime)}:00`,
          endTime: `${this.props.event.date.split('T')[0]}${'T'.concat(this.state.endTime)}:00`,
          chatMuted: false,
          attendeePoints: 250 // Feature planned to be implemented in version 2
        });
      }, 500);
      this.props.onClickCancel();
    }
  }

  handleOnClickCancel() {
    this.props.onClickCancel();
  }

  handleOnSubmitEdit() {
    const formValidated = this.handleValidateForm();
    if (formValidated) {
      const { eventMemberId } = this.props.eMember;
      this.props.patchEventMemberById(eventMemberId, {
        jobTitle: this.state.jobTitle.trim() ? this.state.jobTitle.trim() : this.props.eMember.jobTitle,
        description: this.state.description.trim() ? this.state.description.trim() : this.props.eMember.description,
        startTime: this.state.startTime ? `${this.props.event.date.split('T')[0]}${'T'.concat(this.state.startTime)}:00` : this.props.eMember.startTime,
        endTime: this.state.endTime ? `${this.props.event.date.split('T')[0]}${'T'.concat(this.state.endTime)}:00` : this.props.eMember.endTime,
        chatMuted: false,
        attendeePoints: 250 // Feature planned to be implemented in version 2
      });
      this.props.onClickCancel();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eMember) {
      const { eMember } = nextProps;
      this.setState({
        jobTitle: eMember.jobTitle,
        description: eMember.description,
        startTime: moment(eMember.startTime).format('HH:mm'),
        endTime: moment(eMember.startTime).format('HH:mm'),
        validationErrors: new Map()
      });
    }
  }

  render() {
    return (
      <NewEventMember
        eMember={this.props.eMember}
        editing={this.props.editing}
        validationErrors={this.state.validationErrors}
        onChange={this.handleOnChangeFormInput}
        onCancel={this.handleOnClickCancel}
        onSubmit={this.handleOnSubmit}
        onSubmitEdit={this.handleOnSubmitEdit}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(NewEventMemberContainer);