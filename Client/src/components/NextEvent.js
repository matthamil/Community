import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import moment from 'moment';

const Background = styled.div`
  width: 100%;
  background-color: #2C3E50;
  padding: 10px 0 50px 0;

  @media (max-width: 600px) {
    padding: 10px 0;
  }
`;

const NextEventWrapper = styled.div`
  width: 75vw;
  max-width: 960px;
  margin: 0 auto;
  color: #FFF;
  padding: 20px;

  @media (max-width: 600px) {
    max-width: 90vw;
  }
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

const EventName = styled(Link)`
  font-weight: bold;
  font-size: 2.5em;
  margin: 15px 0;
  color: #fff;

  &:hover,
  &:visited,
  &:focus {
    text-decoration: none;
    color: #fff;
  }
`;

const Organization = styled.h3`
  font-size: 1.25em;
  margin: 5px 0;
`;

const JobTitle = styled.h3`
  font-size: 1.25em;
  margin: 5px 0 0 0;
`;

const NextEventLink = styled.div`
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 770px) {
    flex-direction: column;
    justify-content: space-between;
  }
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

const Address = styled.a`
  color: #fff;
  &:visited,
  &:focus,
  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;

const NextEventContainer = ({ nextEvent, user, userEventMember }) => (
  <Background>
    <NextEventWrapper>
      <Header>Your Next Event</Header>
      <Line/>
      <NextEventLink>
        <div>
          <EventName to={`/events/${nextEvent.eventId}`}>{nextEvent.name}</EventName>
          <Organization>{nextEvent.organization.name}</Organization>
          <JobTitle>{userEventMember.jobTitle}</JobTitle>
        </div>
        <div style={{marginTop: '15px'}}>
          <RighthandWrapper>
            <Icon className="fa fa-clock-o" aria-hidden="true"></Icon>
            <RightItem>{moment(userEventMember.startTime).format('MMM DD HH:mm A')}</RightItem>
          </RighthandWrapper>
          <RighthandWrapper>
            <Icon style={{marginLeft: '2.5px'}} className="fa fa-map-marker" aria-hidden="true"></Icon>
            <RightItem>
              <Address target="_blank" href={`https://www.google.com/maps/place/${nextEvent.address + ' ' + nextEvent.organization.city + ' ' + nextEvent.organization.state}`}>
                {nextEvent.address}
              </Address>
            </RightItem>
          </RighthandWrapper>
        </div>
      </NextEventLink>
    </NextEventWrapper>
  </Background>
);

export default NextEventContainer;