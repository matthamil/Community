import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import moment from 'moment';
import formatTime from '../helpers/formatTime';

const Wrapper = styled.div`
  padding: 20px;
  border-bottom: ${props => props.borderBottom ? '1px solid rgb(238, 238, 238)' : 'none' }
`;

const Name = styled(Link)`
  margin: 0;
  font-size: 2em;
  font-weight: bold;
  color: #2C3E50;
  &:hover {
    text-decoration: none;
    pointer: cursor;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const Time = styled.span`
  font-size: 1.25em;
`;

const Icon = styled.i`
  margin-right: 5px;
`;

const Organization = styled(Link)`
  margin: 0;
  font-size: 1.5em;
  font-weight: 200;
  color: #3498DB;
  display: inline-block;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 575px) {
    text-align: center;
    margin: 0 auto;
  }
`;

const UserOrganizationItem = ({ eventMember, ...props } = {}) => (
  <div>
    <Wrapper borderBottom={props.borderBottom}>
      <Flex>
        <Name
          to={`events/${eventMember.event.eventId}`}>
          {eventMember.jobTitle}
        </Name>
        <Time>
          <Icon className="fa fa-clock-o" aria-hidden="true"></Icon>
          {moment(eventMember.startTime).format('MMM DD HH:mm A')} - {formatTime(moment(eventMember.endTime).format('HH:mm A'))}
        </Time>
      </Flex>
      <Organization to={`organizations/${eventMember.event.organization.organizationId}`}>
        {eventMember.event.organization.name}
      </Organization>
    </Wrapper>
  </div>
);

export default UserOrganizationItem;
