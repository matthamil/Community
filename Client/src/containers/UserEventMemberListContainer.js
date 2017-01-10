import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { browserHistory } from 'react-router';
import Loading from '../components/Loading';
import UserEventMemberList from '../components/UserEventMemberList';

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
          : <h1>You aren't signed up for any events yet.</h1>
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