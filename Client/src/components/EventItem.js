import React, { PropTypes } from 'react';
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

  &:hover {
    cursor: pointer;
  }
`;

const EventName = styled.h3`
  font-weight: bold;
  margin: 5px 0 0 0;
  &:hover {
    color: #3498DB;
    cursor: pointer;
  }
`;

const EventItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
  background-color: #fff;
`;

const VolunteerCount = styled.h4`
  color: rgb(131, 131, 131)
  margin-top: 10px;
  margin-bottom: 0;
`;

// Organization Name
// Event Name
// How many people are going
//    Maybe show something like:
//    2/6 volunteers
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

const EventItem = ({ event }) => (
  <EventItemWrapper>
    <TimeBlock>
      <Time>{moment(event.startTime).format('MMM DD HH:mm A')}</Time>
    </TimeBlock>
    <div>
      <OrganizationName>{event.organization.name}</OrganizationName>
      <EventName>{event.name}</EventName>
      {_calculateNeededVolunteers(event.eventMembers)}
    </div>
  </EventItemWrapper>
);

EventItem.propTypes = {
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
  })
};

export default EventItem;