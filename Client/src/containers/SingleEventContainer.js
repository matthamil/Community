import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import SingleEvent from '../components/SingleEvent';
import NewEventMemberContainer from './NewEventMemberContainer';

class SingleEventContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEventMembers: [],
      unclaimedEventMembers: [],
      claimedEventMembers: [],
      userIsMember: false,
      userIsOrganizer: false,
      addPosition: false
    };

    this.handleOnClaimEventMember = this.handleOnClaimEventMember.bind(this);
    this.handleOnUnclaimEventMember = this.handleOnUnclaimEventMember.bind(this);
    this._checkIfUserIsMemberOfEvent = this._checkIfUserIsMemberOfEvent.bind(this);
    this._checkIfUserIsOrganizer = this._checkIfUserIsOrganizer.bind(this);
    this.handleOnClickAddPosition = this.handleOnClickAddPosition.bind(this);
    this.handleOnClickCancel = this.handleOnClickCancel.bind(this);
    this.handleOnClickDeleteEvent = this.handleOnClickDeleteEvent.bind(this);
  }

  handleOnClaimEventMember(eventMemberId) {
    this.props.claimEventMember(eventMemberId);
  }

  handleOnUnclaimEventMember(eventMemberId) {
    this.props.unclaimEventMember(eventMemberId);
  }

  handleOnClickAddPosition() {
    this.setState({
      addPosition: !this.state.addPosition
    });
  }

  componentDidMount() {
    const id = this.props.params.id;
    this.props.getEventById(id);
  }

  componentDidUpdate() {
    // window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eventById.eventMembers === undefined) return;
    this.setState({
      userEventMembers: nextProps.eventById.eventMembers.filter((eMember) => eMember.volunteer !== null && eMember.volunteer.id === nextProps.user.id),
      unclaimedEventMembers: nextProps.eventById.eventMembers.filter((eMember) => eMember.volunteer === null),
      claimedEventMembers: nextProps.eventById.eventMembers.filter((eMember) => eMember.volunteer !== null && eMember.volunteer.id !== nextProps.user.id),
      userIsMember: this._checkIfUserIsMemberOfEvent(nextProps),
      userIsOrganizer: this._checkIfUserIsOrganizer(nextProps)
    });
  }

  _checkIfUserIsMemberOfEvent(nextProps) {
    const { eventById, user } = nextProps;
    if (eventById.eventMembers === undefined || eventById.eventMembers.length === 0) return false;
    if (eventById.eventMembers.length > 0) {
      return eventById.eventMembers.find((eventMember) => {
        return eventMember.volunteer ? eventMember.volunteer.id === user.id : false;
      }) ? true : false;
    }
  }

  _checkIfUserIsOrganizer(nextProps) {
    const { eventById, user } = nextProps;
    if (eventById === undefined || user === undefined) return false;
    return eventById.organization.organizer.id === user.id;
  }

  handleOnClickCancel() {
    this.setState({
      addPosition: false
    });
  }

  handleOnClickDeleteEvent() {
    this.props.deleteEvent(this.props.eventById.eventId);
  }

  render() {
    const { eventById, user } = this.props;
    return (
      <div>
        {Object.keys(eventById).length > 0 ?
        <SingleEvent
          event={eventById}
          userIsOrganizer={this.state.userIsOrganizer}
          userIsMember={this.state.userIsMember}
          user={user}
          userEventMembers={this.state.userEventMembers}
          claimEventMember={this.handleOnClaimEventMember}
          claimedEventMembers={this.state.claimedEventMembers}
          unclaimEventMember={this.handleOnUnclaimEventMember}
          unclaimedEventMembers={this.state.unclaimedEventMembers}
          onClickAddPosition={this.handleOnClickAddPosition}
          onClickDeleteEvent={this.handleOnClickDeleteEvent}>
          {this.state.addPosition && this.state.userIsOrganizer ?
            <NewEventMemberContainer
              event={eventById}
              onClickCancel={this.handleOnClickCancel}/> : ''}
        </SingleEvent>
        :
        <div>
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ event, account }) => ({
  eventById: event.eventById,
  user: account.user
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventContainer);