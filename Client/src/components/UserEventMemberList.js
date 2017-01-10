import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import UserEventMemberItem from './UserEventMemberItem';

const Wrapper = styled.div`
  width: 75vw;
  max-width: 620px;
  position: relative;
  margin: 0 auto;
  margin-top: 25px;

  @media (max-width: 575px) {
    width: 100%;
  }
`;

const MyEvents = styled.div`
  border: 1px solid rgb(238, 238, 238);
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: center;
  }
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

  @media (max-width: 575px) {
    display: block;
    width: 100%;
    margin-top: 20px;
    text-align: center;
    font-size: 1.5em;
  }
`;

const EventMemberList = styled.div`
  margin-top: 25px;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid rgb(238, 238, 238);
`;

const UserEventMemberList = (props) => (
  <Wrapper>
    <MyEvents>
      <Header>My Events</Header>
      <CreateBtn to={'/events/new'}>Host Event</CreateBtn>
    </MyEvents>
    <EventMemberList>
      {props.userEventMembers.map((eMember, index) =>
        <UserEventMemberItem
          key={index}
          borderBottom={index !== props.userEventMembers.length - 1}
          eventMember={eMember}/>)}
    </EventMemberList>
  </Wrapper>
);

export default UserEventMemberList;

