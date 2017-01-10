import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import Loading from '../components/Loading';
import UserEventMemberList from '../components/UserEventMemberList';
import styled from 'styled-components';

const Warning = styled.h1`
  text-align: center;
  margin: 0 auto;
  color: #2C3E50;
`;

class UserEventMemberListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEventMembers();
  }

  render() {
    const { loading, userEventMembers } = this.props;
    return (
      <div>
        {!loading ?
          userEventMembers ?
          <UserEventMemberList
            userEventMembers={userEventMembers}/>
          : <Warning>You aren't signed up for any events yet.</Warning>
        : <Loading/>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ eventMember, account }) => ({
  userEventMembers: eventMember.userEventMembers,
  loggedIn: account.loggedIn,
  loading: eventMember.loadingUserEventMembers
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEventMemberListContainer);