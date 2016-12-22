import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import NextEvent from '../components/NextEvent';
import EventListSearchBarContainer from './EventListSearchBarContainer';
import EventItem from '../components/EventItem';
import styled from 'styled-components';

const EventItemListWrapper = styled.div`
  max-width: 75vw;
  margin: 0 auto;
`;

class EventListContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { events, nextEvent, user } = this.props;
    return (
      <div>
        {Object.getOwnPropertyNames(nextEvent).length > 0 ?
        <NextEvent
          nextEvent={nextEvent}
          user={user}
          userEventMember={nextEvent.eventMembers.find((member) => member.volunteer.id === user.id)}/>
        : undefined }
        <EventListSearchBarContainer/>
        <EventItemListWrapper>
          {events.map((event, index) => <EventItem event={event} key={index} firstItem={true ? index === 0 : false} lastItem={true ? index === events.length - 1 : false}/>)}
        </EventItemListWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ event, account }) => (
  {
    events: event.events,
    nextEvent: event.nextEvent,
    loading: event.loading,
    user: account.user
  }
);
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);