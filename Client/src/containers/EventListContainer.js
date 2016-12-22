import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import NextEventContainer from './NextEventContainer';
import EventListSearchBarContainer from './EventListSearchBarContainer';
import EventItem from '../components/EventItem';
import styled from 'styled-components';

const EventItemListWrapper = styled.div`
  max-width: 75vw;
  margin: 0 auto;
`;

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
        <EventItemListWrapper>
          {events.map((event, index) => <EventItem event={event} key={index} firstItem={true ? index === 0 : false} lastItem={true ? index === events.length - 1 : false}/>)}
        </EventItemListWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ event }) => ({ events: event.events, loading: event.loading });
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);