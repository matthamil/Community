import React, { PropTypes } from 'react';
import EventItem from '../components/EventItem';
import styled from 'styled-components';

const EventListWrapper = styled.div`
  margin: 50px 0;

  @media (max-width: 950px) {
    margin: 10px 0;
  }
`;

const EventList = ({ events }) => (
  <EventListWrapper>
    {events.map((event, index) => <EventItem event={event} key={index} firstItem={true ? index === 0 : false} lastItem={true ? index === events.length - 1 : false}/>)}
  </EventListWrapper>
);

EventList.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventList;