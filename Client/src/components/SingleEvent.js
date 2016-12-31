import React, { PropTypes } from 'react';
import moment from 'moment';
import styled from 'styled-components';

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
`;

const EventName = styled.h1`
  margin: 0;
  font-weight: bold;
  display: inline-block;
`;

const OrganizationName = styled.a`
  margin: 5px 0;
  font-size: 1.75em;
  font-weight: 300;
  display: block;
`;

const Description = styled.p`
  padding: 0 32.5px;
  margin: 20px 0;
  max-width: 60%;
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
  margin: 40px 0;
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  color: rgb(35, 218, 91);
  padding: 10px 15px;
  border: 1px solid rgb(35, 218, 91);
  border-radius: 3px;
`;

const NotAMember = styled.div`
  margin: 40px 0;
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border: 1px solid #E74C3C;
  color: #E74C3C;
  padding: 10px 15px;
  border-radius: 3px;
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

const DeleteEventMember = styled.span`
  margin-top: 2px;
  color: #b9b9b9;
  border-radius: 3px;
  letter-spacing: 1px;
  display: inline-block;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    color: #E74C3C;
  }
`;
const EditEventMember = styled.span`
  margin-top: 2px;
  color: #b9b9b9;
  border-radius: 3px;
  letter-spacing: 1px;
  display: inline-block;
  text-transform: uppercase;
  margin-right: 5px;
  &:hover {
    cursor: pointer;
    color: rgb(35, 218, 91);
  }
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

const Job = styled.div`
  padding-left: 25px;
`;

const JobTitle = styled.h3`
  font-weight: bold;
  margin: 0;
  color: #3498DB;
`;

const JobTime = styled.h4`
  font-size: 1em;
  margin: 5px 0 10px 0;
`;

const JobDescription = styled.p`
  max-width: 90%;
`;

const AdminOptions = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AdminIcon = styled.i`
  margin-right: 4px;
  font-size: 1em;
`;

const formatTime = (timeString) => {
  const hour = timeString.split(':')[0];
  const remainder = timeString.split(':')[1];

  if (hour > 12) {
    return hour - 12 + ':' + remainder;
  } else {
    return hour + ':' + remainder;
  }
};

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
    <OrganizationName href={`/organizations/${event.organization.organizationId}`}>{event.organization.name}</OrganizationName>
    {userIsOrganizer ?
      <OptionsWrapper>
        <EditEvent>
          <AdminIcon className="fa fa-pencil" aria-hidden="true"></AdminIcon>
          Edit
        </EditEvent>
        <DeleteEvent onClick={props.onClickDeleteEvent}>
          <AdminIcon className="fa fa-times" aria-hidden="true"></AdminIcon>
          Delete
        </DeleteEvent>
        <AddMember onClick={props.onClickAddPosition}>
          <AdminIcon className="fa fa-plus" aria-hidden="true"></AdminIcon>
          Add Position
        </AddMember>
      </OptionsWrapper>
    : ''}
    <Description>{event.description}</Description>
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

    <div style={{width: '75vw', maxWidth: '960px', margin: '0 auto'}}>
      {props.children}
    </div>


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
            <Job>
              {/* Event Member Title */}
              <JobTitle>{eMember.jobTitle}</JobTitle>
              {userIsOrganizer ?
              <div>
                <EditEventMember><i className="fa fa-pencil" aria-hidden="true"></i> Edit</EditEventMember>
                <DeleteEventMember onClick={props.onClickDeleteEventMember.bind(null, eMember.eventMemberId)}><i className="fa fa-times" aria-hidden="true"></i> Remove</DeleteEventMember>
              </div>
              : ''}

              {/* Start Time - End Time */}
              <JobTime>{`${formatTime(moment(eMember.startTime).format('HH:mm A'))} - ${formatTime(moment(eMember.endTime).format('HH:mm A'))}`}</JobTime>

              {/* Event Member Description */}
              <JobDescription>{eMember.description}</JobDescription>
            </Job>
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
            <Job>
              {/* Event Member Title */}
              <JobTitle>{eMember.jobTitle}</JobTitle>
              {userIsOrganizer ?
              <div>
                <EditEventMember><i className="fa fa-pencil" aria-hidden="true"></i> Edit</EditEventMember>
                <DeleteEventMember onClick={props.onClickDeleteEventMember.bind(null, eMember.eventMemberId)}><i className="fa fa-times" aria-hidden="true"></i> Remove</DeleteEventMember>
              </div>
              : ''}
              {/* Start Time - End Time */}
              <JobTime>{`${formatTime(moment(eMember.startTime).format('HH:mm A'))} - ${formatTime(moment(eMember.endTime).format('HH:mm A'))}`}</JobTime>

              {/* Event Member Description */}
              <JobDescription>{eMember.description}</JobDescription>
            </Job>
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
            <Job>
              {/* Event Member Title */}
              <JobTitle>{eMember.jobTitle}</JobTitle>
              {userIsOrganizer ?
              <div>
                <EditEventMember><i className="fa fa-pencil" aria-hidden="true"></i> Edit</EditEventMember>
                <DeleteEventMember onClick={props.onClickDeleteEventMember.bind(null, eMember.eventMemberId)}><i className="fa fa-times" aria-hidden="true"></i> Remove</DeleteEventMember>
              </div>
              : ''}

              {/* Start Time - End Time */}
              <JobTime>{`${formatTime(moment(eMember.startTime).format('HH:mm A'))} - ${formatTime(moment(eMember.endTime).format('HH:mm A'))}`}</JobTime>

              {/* Event Member Description */}
              <JobDescription>{eMember.description}</JobDescription>
            </Job>
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