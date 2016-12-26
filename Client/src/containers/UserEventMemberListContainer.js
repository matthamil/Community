import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

class UserEventMemberListContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.getEventMembers();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        {this.props.userEventMembers.length > 0 ?
          this.props.userEventMembers.map((eMember, index) => <pre key={index}>{JSON.stringify(eMember, null, ' ')}</pre>)
        : <h1>You haven't signed up for any events yet.</h1>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ eventMember }) => ({
  userEventMembers: eventMember.userEventMembers
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEventMemberListContainer);