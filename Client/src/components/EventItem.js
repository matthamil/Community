import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import moment from 'moment';

const Time = styled.h4`
  text-transform: uppercase;
  font-size: 1em;
  color: rgb(131, 131, 131);
  font-weight: bold;
  margin: 0;
`;

const TimeBlock = styled.div`
  padding-right: 20px;
  height: 100%;
  display: flex;
  align-content: flex-start;
  flex-direction: column;
`;

const OrganizationName = styled.h3`
  text-transform: uppercase;
  font-size: 1em;
  color: rgb(131, 131, 131);
  font-weight: bold;
  margin: 0;
  display: block;
`;

const EventName = styled(Link)`
  font-weight: bold;
  margin: ${props => props.orgEvent ? '' : '5px 0 0 0'};
  font-size: 2em;
  color: #000;
  &:hover {
    color: #3498DB;
    cursor: pointer;
    text-decoration: none;
  }
`;

const EventItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  border: 1px solid rgb(238, 238, 238);
  borderRadius: ${calculateBorderRadius};
  border-bottom: ${props => props.lastItem ? '' : 'none'};
  background-color: #fff;
  width: ${props => props.orgEvent ? '' : '75vw'};
  margin: 0 auto;

  @media (max-width: 600px) {
    width: 100vw;
  }
`;

function calculateBorderRadius(props) {
  if (props.firstItem && props.lastItem) {
    return '5px'
  } else if (props.firstItem) {
    return '5px 5px 0 0'
  } else if (props.lastItem) {
    return '0 0 5px 5px';
  } else {
    return 'none';
  }
}

const VolunteerCount = styled.h4`
  color: rgb(131, 131, 131)
  margin-top: 10px;
  margin-bottom: 0;
`;

// Organization Name
// Event Name
// How many people are going
//    Show something like:
//    "2/6 volunteers"
function _calculateNeededVolunteers(eventMembers) {
  // Return a string representing a fraction of total volunteers
  // that have signed up for an event
  const claimed = eventMembers.reduce((all, member) => {
    all += 1 ? member.volunteer !== null : 0;
    return all;
  }, 0);

  const total = eventMembers.length;

  return <VolunteerCount>{claimed}/{total} {total === 1 ? 'position' : 'positions'} filled.</VolunteerCount>;
}

// This is a rough way to format the time to make it more mobile responsive.
const _formatTime = (event) => (
  <Time>{window.screen.availWidth > 600 ?
    <div>{moment(event.startTime).format('MMM DD HH:mm A')}</div> :
    <div>{moment(event.startTime).format('MMM DD')}<br/>{moment(event.startTime).format('hh:mm A')}</div>}
  </Time>
);

const EventItem = ({ event, firstItem, lastItem, orgEvent = false }) => (
  <EventItemWrapper
    firstItem={firstItem}
    lastItem={lastItem}
    orgEvent={orgEvent}>
    <TimeBlock>
      {_formatTime(event)}
    </TimeBlock>
    <div>
      {orgEvent === false ? <OrganizationName>{event.organization.name}</OrganizationName> : ''}
      <EventName
        to={{ pathname: `events/${event.eventId}`, orgEvent }}>
        {event.name}
      </EventName>
      {_calculateNeededVolunteers(event.eventMembers)}
    </div>
  </EventItemWrapper>
);

EventItem.propTypes = {
  firstItem: PropTypes.bool.isRequired,
  lastItem: PropTypes.bool.isRequired,
  event: PropTypes.shape({
    eventId: PropTypes.number.isRequired,
    organization: PropTypes.shape({
      organizationId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      dateCreated: PropTypes.string.isRequired,
      organizer: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })
    }),
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    eventMembers: PropTypes.arrayOf(PropTypes.object)
  }),
  orgEvent: PropTypes.bool
};

export default EventItem;