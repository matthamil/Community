import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import NextEventContainer from './NextEventContainer';
import EventListSearchBarContainer from './EventListSearchBarContainer';
import EventItem from '../components/EventItem';

class EventListContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { events } = this.props;
    return (
      <div>
        <NextEventContainer/>
        <EventListSearchBarContainer/>
        <div>
          {events.map((event, index) => <EventItem event={event} key={index}/>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ event }) => ({ events: event.events, loading: event.loading });
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);