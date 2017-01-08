import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import UserOrganizationItemContainer from '../containers/UserOrganizationItemContainer';

const Wrapper = styled.div`
  width: 75vw;
  max-width: 620px;
  position: relative;
  margin: 0 auto;
  margin-top: 25px;
`;

const MyOrganizations = styled.div`
  border: 1px solid rgb(238, 238, 238);
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
`;

const Header = styled.h1`
  margin: 0;
  color: #333;
  font-weight: bold;
`;

const CreateBtn = styled(Link)`
  background-color: #fff;
  color: rgb(35, 218, 91);
  padding: 5px 10px;
  border: 1px solid rgb(35, 218, 91);
  border-radius: 3px;
  transition: all 0.15s ease-out;

  &:hover {
    color: #fff;
    background-color: rgb(35, 218, 91);
    text-decoration: none;
    cursor: pointer;
  }
`;

const OrganizationList = styled.div`
  margin-top: 25px;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid rgb(238, 238, 238);
`;

const UserOrganizationsItemList = (props) => (
  <Wrapper>
    <MyOrganizations>
      <Header>My Organizations</Header>
      <CreateBtn to={'organizations/new'}>Create</CreateBtn>
    </MyOrganizations>
    <OrganizationList>
      {props.userOrganizations.map((org, index) =>
        <UserOrganizationItemContainer
          key={index}
          borderBottom={index !== props.userOrganizations.length - 1}
          organization={org}/>)}
    </OrganizationList>
  </Wrapper>
);

export default UserOrganizationsItemList;

