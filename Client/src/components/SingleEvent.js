import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import styled from 'styled-components';
import formatTime from '../helpers/formatTime';
import JobContainer from '../containers/JobContainer';
import ReactMarkdown from 'react-markdown';

// const Wrapper = styled.div`
//   width: 75vw;
//   margin: 0 auto;
//   margin-top: 25px;
//   padding: 40px 40px 0 40px;
//   border-radius: 3px;
//   background-color: #fff;
//   border: 1px solid #ededed;
// `;

const TopWrapper = styled.div`
  width: 75vw;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 25px;
  padding: 40px 40px 0 40px;
  border-radius: 3px 3px 0 0;
  background-color: #fff;
  border: 1px solid #ededed;
  border-bottom: none;

  @media (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`;

const BottomWrapper = styled.div`
  width: 75vw;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 40px 40px 40px;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  border: 1px solid #ededed;
  border-top: none;

  @media (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`;

const EventName = styled.h1`
  margin: 0;
  font-weight: bold;
  display: inline-block;

  @media (max-width: 600px) {
    text-align: center;
    display: block;
  }
`;

const OrganizationName = styled(Link)`
  margin: 5px 0;
  font-size: 1.75em;
  font-weight: 300;
  display: block;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const Description = styled.div`
  padding: 0 32.5px;
  margin: 20px 0;
  max-width: 60%;

  @media (max-width: 800px) {
    width: 100%;
    max-width: 100%;
  }

  @media (max-width: 400px) {
    padding: 0;
  }
`;

const Icon = styled.i`
  font-size: 1.5em;
  margin-right: 15px;
  display: block;
`;

const IconContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Time = styled.h3`
  margin: 0;
`;

const Address = styled.a`
  margin: 0;
  font-size: 1.75em;
`;

const TimeAndAddress = styled.div`
  margin-bottom: 20px;
`;

const MemberOfEvent = styled.div`
  margin: 20px 0;
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  color: rgb(35, 218, 91);
  padding: 10px 15px;
  border: 1px solid rgb(35, 218, 91);
  border-radius: 3px;

  @media (max-width: 960px) {
    width: 40%;
  }

  @media (max-width: 850px) {
    width: 45%;
  }

  @media (max-width: 600px) {
    width: 50%;
  }

  @media (max-width: 400px) {
    width: 80%;
    margin: 20px auto;
  }
`;

const NotAMember = styled.div`
  margin: 20px 0;
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border: 1px solid #E74C3C;
  color: #E74C3C;
  padding: 10px 15px;
  border-radius: 3px;

  @media (max-width: 960px) {
    width: 40%;
  }

  @media (max-width: 850px) {
    width: 45%;
  }

  @media (max-width: 600px) {
    width: 50%;
  }

  @media (max-width: 400px) {
    width: 80%;
    margin: 20px auto;
  }
`;

const MemberContent = styled.p`
  margin: 0 0 0 5px;
`;

const AvailablePositions = styled.h3`
  margin: 0;
  font-size: 1em;
  margin-top: 20px;
  color: #3a3a3a;
  text-transform: uppercase;
`;

const NoAvailablePositions = styled.h3`
  margin: 0;
  font-size: 1em;
  padding: 40px 0;
  font-weight: bold;
  color: #3a3a3a;
  text-transform: uppercase;
`;

const Break = styled.hr`
  margin-top: 5px;
`;

const ClaimBtn = styled.button`
  margin-top: 3px;
  color: #fff;
  font-size: 0.85em;
  background-color: rgb(35, 218, 91);
  padding: 5px 10px;
  border-radius: 3px;
  letter-spacing: 0.25px;
  border: none;
  display: block;
`;

const UnclaimBtn = styled.button`
  margin-top: 3px;
  color: #fff;
  font-size: 0.85em;
  background-color: #E74C3C;
  padding: 5px 10px;
  border-radius: 3px;
  letter-spacing: 0.25px;
  border: none;
  display: block;
`;

const ClaimedBtn = styled.button`
  margin-top: 3px;
  color: #fff;
  font-size: 0.85em;
  background-color: #b7b7b7;
  padding: 5px 10px;
  border-radius: 3px;
  letter-spacing: 0.25px;
  border: none;
  display: block;
`;

const ClaimBtnWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EventMember = styled.div`
  display: flex;
  flex-direction: row;
`;

const AdminOptions = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  @media (max-width: 700px) {
    float: none;
    margin-top: 10px;
  }

  @media (max-width: 600px) {
    justify-content: space-around;
  }
`;
const YourEvent = styled.span`
  background-color: #b9b9b9;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 2px;
  color: #fff;
  padding: 3px 8px;
  text-transform: uppercase;
  display: block;
`;
const EditEvent = styled.span`
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
const DeleteEvent = styled.span`
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

const AddMember = styled.span`
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
    color: rgb(255, 181, 10);
  }
`;

const Chatroom = styled(Link)`
  display: inline-block;
  background-color: #fff;
  color: #b9b9b9;
  letter-spacing: 1px;
  text-align: left;
  border-radius: 2px;
  padding: 3px 8px;
  margin-right: 5px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    color: #3498DB;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: space-between;
  }
`;

const AdminIcon = styled.i`
  margin-right: 4px;
  font-size: 1em;
`;

const SingleEvent = ({ event, user, userIsOrganizer, userIsMember, claimEventMember, unclaimEventMember, userEventMembers, claimedEventMembers, unclaimedEventMembers, ...props }) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
  <TopWrapper>
    <EventName>{event.name}</EventName>
    {userIsOrganizer ?
      <AdminOptions>
        <YourEvent>
          <AdminIcon className="fa fa-star" aria-hidden="true"></AdminIcon>
          Your Event
        </YourEvent>
      </AdminOptions> : ''}
    <OrganizationName to={`/organizations/${event.organization.organizationId}`}>{event.organization.name}</OrganizationName>
    {userIsOrganizer ?
      <OptionsWrapper>
        <EditEvent onClick={props.onClickEditEvent}>
          <AdminIcon className="fa fa-pencil" aria-hidden="true"></AdminIcon>
          Edit
        </EditEvent>
        <DeleteEvent onClick={props.onClickDeleteEvent}>
          <AdminIcon className="fa fa-times" aria-hidden="true"></AdminIcon>
          Delete
        </DeleteEvent>
        <AddMember onClick={props.onClickAddPosition}>
          <AdminIcon className="fa fa-plus" aria-hidden="true"></AdminIcon>
          Position
        </AddMember>
      </OptionsWrapper>
    : ''}
    <Description><ReactMarkdown source={event.description}/></Description>
    <TimeAndAddress>
      <IconContent>
        <Icon className="fa fa-clock-o" aria-hidden="true"></Icon>
        <Time>{moment(event.startTime).format('MMM DD HH:mm A')} - {formatTime(moment(event.endTime).format('HH:mm A'))}</Time>
      </IconContent>
      <IconContent>
        <Icon style={{marginLeft: '3px'}} className="fa fa-map-marker" aria-hidden="true"></Icon>
        <Address target="_blank" href={`https://www.google.com/maps/place/${event.address + ' ' + event.organization.city + ' ' + event.organization.state}`}>
          {event.address}
        </Address>
      </IconContent>
    </TimeAndAddress>
    </TopWrapper>

    {props.children}

    <BottomWrapper>

    {unclaimedEventMembers.length === 0 ?
    <NoAvailablePositions>There are no available positions for this event.</NoAvailablePositions>
    : ''}

    {userIsMember ?
    <MemberOfEvent>{/* User is a member of this event*/}
      <i className="fa fa-smile-o" aria-hidden="true"></i>
      <MemberContent>You are a member of this event.</MemberContent>
    </MemberOfEvent>
    :
    <NotAMember>{/* User is not a member of this event?*/}
      <i className="fa fa-frown-o" aria-hidden="true"></i>
      <MemberContent>You are not a member of this event.</MemberContent>
    </NotAMember>
    }

    {userIsMember || userIsOrganizer ?
    <Chatroom to={`/chat/${event.eventId}`}>
      <AdminIcon className="fa fa-comments" aria-hidden="true"></AdminIcon>
      Chatroom
    </Chatroom>
    : ''}

    {userEventMembers.length > 0 ?
    <div>
      <AvailablePositions>Your Positions</AvailablePositions>
      <Break/>
    </div>
    :
    ''}


    {/* Your Positions */}
    <div>
      {userEventMembers.map((eMember, index) => {
        return (
          <EventMember key={index}>{/* Loop this div for each open event member */}
            <ClaimBtnWrapper>
              <UnclaimBtn onClick={unclaimEventMember.bind(null, eMember.eventMemberId)}>UNCLAIM</UnclaimBtn>
            </ClaimBtnWrapper>
            <JobContainer
              eMember={eMember}
              userIsOrganizer={userIsOrganizer}
              onClickDeleteEventMember={props.onClickDeleteEventMember}
              event={event}/>
          </EventMember>
        );
      })}
    </div>
    {unclaimedEventMembers.length > 0 ?
    <div>
      <AvailablePositions>Available Positions</AvailablePositions>
      <Break/>
    </div>
    :
    ''}
    {/* Available Positions */}
    <div>
      {unclaimedEventMembers.map((eMember, index) => {
        return (
          <EventMember key={index}>{/* Loop this div for each open event member */}
            <ClaimBtnWrapper>
              <ClaimBtn onClick={claimEventMember.bind(null, eMember.eventMemberId)}>CLAIM</ClaimBtn>
            </ClaimBtnWrapper>
            <JobContainer
              eMember={eMember}
              userIsOrganizer={userIsOrganizer}
              event={event}/>
          </EventMember>
        );
      })}
    </div>

    {claimedEventMembers.length > 0 ?
    <div>
      <AvailablePositions>Claimed Positions</AvailablePositions>
      <Break/>
    </div>
    :
    ''}
    {/* Available Positions */}
    <div>
      {claimedEventMembers.map((eMember, index) => {
        return (
          <EventMember key={index}>{/* Loop this div for each open event member */}
            <ClaimBtnWrapper>
              <ClaimedBtn disabled="true">CLAIMED</ClaimedBtn>
            </ClaimBtnWrapper>
            <JobContainer
              eMember={eMember}
              userIsOrganizer={userIsOrganizer}
              event={event}/>
          </EventMember>
        );
      })}
    </div>
  </BottomWrapper>
  </div>
);

SingleEvent.propTypes = {
  user: PropTypes.object.isRequired,
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
  userIsMember: PropTypes.bool.isRequired,
  claimEventMember: PropTypes.func.isRequired,
  unclaimEventMember: PropTypes.func.isRequired
};

export default SingleEvent;