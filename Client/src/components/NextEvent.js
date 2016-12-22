import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import moment from 'moment';

const Background = styled.div`
  width: 100vw;
  background-color: #2C3E50;
  padding: 10px 0;
`;

const NextEventWrapper = styled.div`
  max-width: 75vw;
  margin: 0 auto;
  color: #FFF;
  padding: 20px;
`;

//border-radius: 5px;
//border: 1px solid rgb(238, 238, 238);

const Header = styled.h3`
  text-transform: uppercase;
  font-size: 1em;
  margin-top: 0;
  font-weight: bold;
`;

const Line = styled.hr`
  margin: 0;
`;

const EventName = styled.h3`
  font-weight: bold;
  font-size: 2.5em;
  margin: 15px 0;
  color: #fff;
`;

const Organization = styled.h3`
  font-size: 1.25em;
  margin: 5px 0;
`;

const JobTitle = styled.h3`
  font-size: 1.25em;
  margin: 5px 0 0 0;
`;

const NextEventLink = styled(Link)`
  color: #fff;
  &:hover,
  &:visited {
    text-decoration: none;
    color: #fff;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Icon = styled.i`
  margin-right: 10px;
  color: #b3c2d1;
`

const RighthandWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25em;
  margin: 5px 0;
`;

const RightItem = styled.h3`
  margin: 0;
  font-size: 1.25em;
`;

const NextEventContainer = ({ nextEvent, user, userEventMember }) => (
  <Background>
    <NextEventWrapper>
      <Header>Your Next Event</Header>
      <Line/>
      <NextEventLink to={`/events/${nextEvent.eventId}`}>
        <div>
          <EventName>{nextEvent.name}</EventName>
          <Organization>{nextEvent.organization.name}</Organization>
          <JobTitle>{userEventMember.jobTitle}</JobTitle>
        </div>
        <div style={{marginTop: '15px'}}>
          <RighthandWrapper>
            <Icon className="fa fa-clock-o" aria-hidden="true"></Icon>
            <RightItem>{moment(userEventMember.startTime).format('MMM DD HH:mm A')}</RightItem>
          </RighthandWrapper>
          <RighthandWrapper>
            <Icon style={{marginLeft: '3px'}} className="fa fa-map-marker" aria-hidden="true"></Icon>
            <RightItem>{nextEvent.address}</RightItem>
          </RighthandWrapper>
        </div>
      </NextEventLink>
    </NextEventWrapper>
  </Background>
);

export default NextEventContainer;