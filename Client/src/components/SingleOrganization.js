import React from 'react';
import styled from 'styled-components';
import EventList from './EventList';

const Wrapper = styled.div`
  width: 75vw;
  max-width: 960px;
  background-color: #fff;
  position: relative;
  margin: 0 auto;
  margin-top: 25px;
  border-radius: 3px;

  @media (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`;

const InnerWrapper = styled.div`
  padding: 40px;
  background-color: #fff;
  border: 1px solid #ededed;
  border-radius: 0 0 3px 3px;
  border-top: none;

  @media (max-width: 600px) {
    padding: 0 20px 20px 20px;
  }
`;

const Name = styled.h1`
  margin: 0 auto;
  background-color: #2C3E50;
  color: #fff;
  padding: 40px;
  text-align: center;
  font-weight: 700;
  border-radius: 3px 3px 0 0;
`;

const Location = styled.h2`
  background-color: rgb(142,142,142);
  color: #fff;
  display: block;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  font-size: 1em;
  padding: 10px 20px;
  margin: 0 auto;
  border-radius: 3px;
  max-width: 190px;
`;

const LocationWrapper = styled.div`
  position: absolute;
  transform: translateY(-17.5px);
  width: 75vw;
  max-width: 960px;

  @media (max-width: 600px) {
    display: block;
    position: static;
    margin: 0 auto;
  }
`

const Description = styled.div`

`;

const OrganizerWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25em;
`;

const OrganizerIcon = styled.i`
  margin-right: 5px;
`;

const Organizer = styled.div`

`;

const EventsHeader = styled.h2`
  margin: 0;
  padding-top: 20px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    justify-content: space-around;
    margin-top: 10px;
  }
`;
const AdminOptions = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  @media (max-width: 600px) {
    float: none;
    justify-content: space-around;
  }
`;
const YourOrganization = styled.span`
  background-color: #fff;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 2px;
  color: rgb(255, 181, 10);
  padding: 3px 8px;
  text-transform: uppercase;
  display: block;
`;
const InactiveOrganization = styled.span`
  background-color: #E74C3C;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 2px;
  color: #fff;
  padding: 3px 8px;
  text-transform: uppercase;
  display: block;
`;

const Edit = styled.span`
  display: block;
  background-color: #fff;
  color: #b9b9b9;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 2px;
  padding: 3px 8px;
  margin-right: 5px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    color: rgb(35, 218, 91);
  }
`;
const Delete = styled.span`
  display: block;
  background-color: #fff;
  color: #b9b9b9;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 2px;
  padding: 3px 8px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    color: #E74C3C;
  }
`;
const AdminIcon = styled.i`
  margin-right: 4px;
  font-size: 1em;
`;

const InactiveIcon = styled.i`
  margin-right: 4px;
  font-size: 1em;
`;

const NoEvents = styled.p`
  margin-top: 10px;
`;

const SingleOrganization = ({ organization, events, userIsOrganizer, ...props }) => (
  <Wrapper>
    <Name>{organization.name}</Name>
    <LocationWrapper>
      <Location>{organization.city}, {organization.state}</Location>
    </LocationWrapper>
    <InnerWrapper>
      {userIsOrganizer && organization.isActive ?
      <AdminOptions>
        <YourOrganization>
          <AdminIcon className="fa fa-star" aria-hidden="true"></AdminIcon>
          Your Organization
        </YourOrganization>
      </AdminOptions> : ''}
      {!organization.isActive ?
      <AdminOptions>
        <InactiveOrganization>
          <InactiveIcon className="fa fa-exclamation-triangle" aria-hidden="true"></InactiveIcon>
          INACTIVE
        </InactiveOrganization>
      </AdminOptions> : ''}
      {userIsOrganizer && organization.isActive ?
      <OptionsWrapper>
        <Edit onClick={props.onClickEdit}>
          <AdminIcon className="fa fa-pencil" aria-hidden="true"></AdminIcon>
          Edit
        </Edit>
        <Delete onClick={props.onClickDelete}>
          <AdminIcon className="fa fa-times" aria-hidden="true"></AdminIcon>
          Delete
        </Delete>
      </OptionsWrapper>
      : ''}

      <div style={{width: '75vw', maxWidth: '960px', margin: '0 auto'}}>
        {props.children}
      </div>

      <Description>{organization.description}</Description>
      <OrganizerWrapper>
        <OrganizerIcon className="fa fa-user" aria-hidden="true"></OrganizerIcon>
        <Organizer>Organizer: {organization.organizer.firstName + ' ' + organization.organizer.lastName}</Organizer>
      </OrganizerWrapper>

      {organization.isActive ?
      <div>
        <EventsHeader>Upcoming Events</EventsHeader>
        {events.length > 0 ?
        <EventList
          events={events}
          orgEventList={true}/>
        : <NoEvents>No upcoming events.</NoEvents>}
      </div>
      : ''}
    </InnerWrapper>
  </Wrapper>
);

export default SingleOrganization;