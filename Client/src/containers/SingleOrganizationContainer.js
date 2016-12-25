import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

class SingleOrganizationContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const id = this.props.params.id;
    this.props.getOrganizationById(id);
    this.props.getEventsByOrganizationId(id);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.orgById, null, ' ')}</pre>
        <div>
          {this.props.events.map((event, index) => <pre key={index}>{JSON.stringify(event, null, ' ')}</pre>)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ organization, event }) => ({
  orgById: organization.orgById,
  events: event.orgEvents
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrganizationContainer);