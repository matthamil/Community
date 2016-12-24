import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

// Single Event Container
// should contain:
// Event Title
//   Organization
// Time
// Location (Google Maps link if possible)
// Available Positions
//   Each position:
//     Job Title [CLAIM]
//     StartTime - EndTime
//     Description
// Filled Positions
//   Each position:
//     Job Title
//     Volunteer: FirstName LastName
//     StartTime - EndTime
//     Description


class SingleEventContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const id = this.props.params.id;
    this.props.getEventById(id);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.eventById, null, ' ')}</pre>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ event }) => ({
  eventById: event.eventById
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventContainer);