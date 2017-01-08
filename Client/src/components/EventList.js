import React, { PropTypes } from 'react';
import EventItem from './EventItem';
import styled from 'styled-components';

const EventListWrapper = styled.div`
  margin: ${props => props.orgEventList ? '20px 0' : '50px 0'};

  @media (max-width: 950px) {
    margin: 10px 0;
  }
`;

const EventList = ({ events, orgEventList = false } = {}) => (
  <EventListWrapper orgEventList={orgEventList}>
    {events.map((event, index) =>
      <EventItem
        event={event}
        key={index}
        firstItem={index === 0}
        lastItem={index === events.length - 1}
        orgEvent={orgEventList}/>)}
  </EventListWrapper>
);

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  orgEventList: PropTypes.bool
};

export default EventList;