import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import formatTime from '../helpers/formatTime';
import { Link } from 'react-router';

const Wrapper = styled.div`
  padding: 20px;
  background-image: linear-gradient(to bottom, #dadada, #ECF0F1 5%, #ECF0F1);
  background-color: #ECF0F1;
`;

const Event = styled.div`
  padding: 0 40px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled(Link)`
  margin: 0;
  color: #3498DB;
  font-size: 1.5em;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const Icon = styled.i`
  margin-right: 5px;
`;

const Time = styled.span`
  font-size: 1.25em;
`;

const Divider = styled.hr`
  margin: 10px 0;
  border-color: #d0d0d0;
`;

function calculateNeededVolunteers(eventMembers) {
  // Return a string representing a fraction of total volunteers
  // that have signed up for an event
  const claimed = eventMembers.reduce((all, member) => {
    all += 1 ? member.volunteer !== null : 0;
    return all;
  }, 0);

  const total = eventMembers.length;

  return `${claimed + '/' + total + (total === 1 ? ' position ' : ' positions ') + 'filled.'}`;
}

const EventListDropdown = ({ events, id, ...props }) => (
  <Wrapper>
    {events.map((event, index) =>
    <div key={`${id}-${index}-event`}>
      <Event>
        <Flex>
          <Name to={`events/${event.eventId}`}>{event.name}</Name>
          <Time>
            <Icon className="fa fa-clock-o" aria-hidden="true"></Icon>
            {moment(event.startTime).format('MMM DD HH:mm A')} - {formatTime(moment(event.endTime).format('HH:mm A'))}
          </Time>
        </Flex>
        <Icon className="fa fa-user-o" aria-hidden="true"></Icon>
        <span>{calculateNeededVolunteers(event.eventMembers)}</span>
      </Event>
      {index !== events.length - 1 ? <Divider/> : ''}
    </div>
    )}
  </Wrapper>
);

export default EventListDropdown;