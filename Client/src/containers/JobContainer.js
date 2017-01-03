import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import Job from '../components/Job';
import NewEventMemberContainer from './NewEventMemberContainer';
import Modal from 'react-modal';

class JobContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnClickDeleteEventMember = this.handleOnClickDeleteEventMember.bind(this);
    this.handleOnClickEditEventMember = this.handleOnClickEditEventMember.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  static propTypes = {
    eMember: PropTypes.object.isRequired,
    userIsOrganizer: PropTypes.bool.isRequired
  }
  state = {
    isEditing: false,
    jobTitle: '',
    description: '',
    startTime: '',
    endTime: ''
  }

  handleOnClickDeleteEventMember(id) {
    this.props.deleteEventMember(id);
  }

  handleOnClickEditEventMember() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleCloseModal() {
    this.setState({
      isEditing: false
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div>
        <Job
          {...this.props}
          onClickDeleteEventMember={this.handleOnClickDeleteEventMember}
          onClickEditEventMember={this.handleOnClickEditEventMember}>
          <Modal
            isOpen={this.state.isEditing}
            contentLabel="Edit Job"
            onRequestClose={this.handleCloseModal}
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
            <NewEventMemberContainer
              editing={true}
              eMember={this.props.eMember}
              onClickCancel={this.handleOnClickEditEventMember}
              event={this.props.event}/>
          </Modal>
        </Job>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
export default connect(null, mapDispatchToProps)(JobContainer);