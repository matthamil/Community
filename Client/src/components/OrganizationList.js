import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 50px auto;
  max-width: 960px;
  width: 75vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 960px) {
    margin: 20px auto;
    width: 100%;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    margin: 10px auto;
  }
`;

const List = styled.div`
  width: 60%;
  border-radius: 3px;
  border: 1px solid rgb(238, 238, 238);
  background: #fff;

  @media (max-width: 960px) {
    width: 75%;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CreateBox = styled.div`
  width: 35%;
  border-radius: 3px;
  border: 1px solid rgb(238, 238, 238);
  padding: 40px 20px;
  background-color: #fff;

  @media (max-width: 960px) {
    order: -1;
    width: 75%;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    order: -1;
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
    font-size: 1.5em;
  }
`;

const Organization = styled.div`
  padding: 20px;
  border-bottom: ${props => props.bottomBorder ? '1px solid rgb(238, 238, 238)' : ''}
`;

const Name = styled(Link)`
  font-weight: bold;
  margin: 0;
  font-size: 2em;
  color: #000;
  &:hover {
    color: #3498DB;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Location = styled.h3`
  text-transform: uppercase;
  font-size: 1em;
  color: rgb(131, 131, 131);
  font-weight: bold;
  margin: 0;
  display: block;
`;

const Upcoming = styled.h3`
  font-size: 1.25em;
  color: #3498DB;
  font-weight: 200;
  margin-top: 10px;
  margin-bottom: 0;
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

const OrganizationList = ({ organizations }) => (
  <Wrapper>
    <List>
      {organizations.map((org, key) =>
      <Organization key={key} bottomBorder={key !== organizations.length - 1}>
        <Name to={`organizations/${org.organizationId}`}>{org.name}</Name>
        <Location>{org.city}, {org.state}</Location>
        <Upcoming>{calculateUpcomingEventsText(org.events)}</Upcoming>
      </Organization>
      )}
    </List>
    <CreateBox>
      <span>Can't find your organization?<br/><Link to={'organizations/new'}>Start an organization today</Link>.</span>
    </CreateBox>
  </Wrapper>
);

OrganizationList.propTypes = {
  organizations: PropTypes.array.isRequired
};

export default OrganizationList;