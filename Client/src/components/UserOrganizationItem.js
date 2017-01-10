import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const Wrapper = styled.div`
  padding: 20px 20px 0 20px;
  border-bottom: ${props => props.borderBottom ? '1px solid rgb(238, 238, 238)' : 'none' }
`;

const Caret = styled.i`
  display: inline-block;
  font-size: 1.5em;
  color: #333;
  transition: transform 0.2s ease-out;
  transform: ${props => props.dropDownActive ? 'rotate(-180deg);' : 'rotate(0deg);'}
  &:hover {
    cursor: pointer;
  }
`;

const Warning = styled.i`
  display: inline-block;
  font-size: 1.5em;
  color: #E74C3C;
`;

const Edit = styled.span`
  display: inline-block;
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

  @media (max-width: 575px) {
    font-size: 1.25em;
  }
`;

const EditIcon = styled.i`
  margin-right: 4px;
  font-size: 1em;
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

const Events = styled.h2`
  margin: 0;
  font-size: 1.5em;
  font-weight: 200;
  color: ${props => props.noEvents ? '#E74C3C;' : '#3498DB;'}
  display: inline;
  margin-right: 10px;
  &:hover {
    cursor: ${props => props.noEvents ? '' : 'pointer;'}
  }
`;

const Upcoming = styled.div`
  margin-bottom: 20px;
  padding-left: 40px;

  @media (max-width: 575px) {
    padding-left: 0;
    text-align: center;
  }
`;

function calculateUpcomingEventsText(events) {
  // {organization.events.length} upcoming event{organization.events.length > 1 ? 's' : ''}
  if (events.length === 0) {
    return '0 upcoming events';
  } else if (events.length === 1) {
    return '1 upcoming event';
  } else {
    return `${events.length} upcoming events`;
  }
}

const UserOrganizationItem = ({ organization, ...props } = {}) => (
  <div>
    <Wrapper borderBottom={props.borderBottom}>
      <Flex>
        <Name
          to={`organizations/${organization.organizationId}`}>
          {organization.name}
        </Name>
        <Edit onClick={props.onClickEdit}>
          <EditIcon className="fa fa-pencil" aria-hidden="true"></EditIcon>
          Edit
        </Edit>
      </Flex>
      <Upcoming>
        <Events
          noEvents={organization.events.length === 0}
          onClick={organization.events.length !== 0 ? props.onClickToggleDropDown : undefined}>
          {calculateUpcomingEventsText(organization.events)}
        </Events>
        {organization.events.length === 0 ?
        <Warning className="fa fa-exclamation-triangle" aria-hidden="true"></Warning>
        :
        <Caret
          onClick={props.onClickToggleDropDown}
          className="fa fa-angle-down"
          aria-hidden="true"
          dropDownActive={props.dropDownActive}>
        </Caret>}
      </Upcoming>
    </Wrapper>
    {props.children}
  </div>
);

export default UserOrganizationItem;
