import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actionCreators from '../actions/actionCreators';

class NextEventContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { nextEvent, user } = this.props;
    console.log(this.props.nextEvent);
    return (
      <div>
        {/*<h3>Your Next Event</h3>
        <hr/>
        <div>
          <h1>{nextEvent.name}</h1>
          <h3>{nextEvent.organization.name}</h3>
          <h3>{nextEvent.eventMembers.filter((member) => member.volunteer.id === user.id)[0].jobTitle}</h3>
        </div>
        <div>
        </div>*/}
      </div>
    );
  }
}

//const mapStateToProps = ({ event, account }) => ({ nextEvent: event.nextEvent, user: { account } });

export default NextEventContainer;