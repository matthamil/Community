import React from 'react';
import styled from 'styled-components';
import formatTime from '../helpers/formatTime';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

const JobWrapper = styled.div`
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

const JobDescription = styled.div`
  max-width: 90%;
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

  @media (max-width: 600px) {
    margin-right: 30px;
  }
`;


const Job = ({ eMember, userIsOrganizer, isEditing, ...props }) => (
  <JobWrapper>
    {/* Event Member Title */}
    <JobTitle>{eMember.jobTitle}</JobTitle>
    {userIsOrganizer ?
    <div>
      <EditEventMember onClick={props.onClickEditEventMember}><i className="fa fa-pencil" aria-hidden="true"></i> Edit</EditEventMember>
      <DeleteEventMember onClick={props.onClickDeleteEventMember.bind(null, eMember.eventMemberId)}><i className="fa fa-times" aria-hidden="true"></i> Remove</DeleteEventMember>
    </div>
    : ''}

    {/* Start Time - End Time */}
    <JobTime>{`${formatTime(moment(eMember.startTime).format('HH:mm A'))} - ${formatTime(moment(eMember.endTime).format('HH:mm A'))}`}</JobTime>

    {/* Event Member Description */}
    <JobDescription><ReactMarkdown source={eMember.description}/></JobDescription>

    {/* Render edit window */}
    {props.children}

  </JobWrapper>
);

export default Job;