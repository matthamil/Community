import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import NextEvent from '../components/NextEvent';
import EventListSearchBar from '../components/EventListSearchBar';
import ListView from '../components/ListView';
import organizationAndEventsSelector from '../selectors/organizationAndEventsSelector';

class EventListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      searchType: 'event',
      eventList: [],
      organizationList: []
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    this.handleOnChangeLocation = this.handleOnChangeLocation.bind(this);
    this.handleOnChangeSearchType = this.handleOnChangeSearchType.bind(this);
    this.filterOrganizations = this.filterOrganizations.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
  }

  static defaultProps = {

  }

  handleOnSubmit() {

  }

  handleOnChangeSearch(e) {
    const text = e.target.value.trim();
    if (text === '') {
      this.setState({
        eventList: this.props.events,
        organizationList: this.props.organizations
      });
    } else {
      this.setState({
        searchText: text,
        eventList: this.filterEvents(this.props.events),
        organizationList: this.filterOrganizations(this.props.organizations)
      });
    }
  }

  handleOnChangeSearchType(type) {
    this.setState({
      searchType: type
    });
  }

  handleOnChangeLocation(e) {

  }

  filterEvents(events) {
    const searchText = this.state.searchText.toLowerCase();
    if (searchText === '') return events;

    return events.filter((event) => {
      return event.name.toLowerCase().includes(searchText) || event.organization.name.toLowerCase().includes(searchText);
    });
  }

  filterOrganizations(organizations) {
    const searchText = this.state.searchText.toLowerCase();
    if (searchText === '') return organizations;

    return organizations.filter((organization) => {
      return organization.name.toLowerCase().includes(searchText);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      eventList: nextProps.events,
      organizationList: nextProps.organizations
    });
  }

  componentDidMount() {
    this.props.getEventList('Nashville', 'TN');
    this.props.getNextEvent();
    this.props.getOrganizationList('Nashville', 'TN');
    this.setState({
      eventList: this.props.events,
      organizationList: this.props.organizations
    });
  }

  render() {
    const { nextEvent, user } = this.props;
    return (
      <div>
        {nextEvent.eventMembers ?
        <NextEvent
          nextEvent={nextEvent}
          user={user}
          userEventMember={nextEvent.eventMembers.find((member) => member.volunteer.id === user.id)}/>
        : 'You aren\'t signed up for an event yet.' }
        <EventListSearchBar
          onSubmit={this.handleOnSubmit}
          onChangeSearch={this.handleOnChangeSearch}
          onChangeSearchType={this.handleOnChangeSearchType}
          onChangeLocation={this.handleOnChangeLocation}
          searchType={this.state.searchType}/>
        <ListView
          searchType={this.state.searchType}
          events={this.state.eventList}
          organizations={this.state.organizationList}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.event.events,
  nextEvent: state.event.nextEvent,
  loading: state.event.loading,
  user: state.account.user,
  organizations: organizationAndEventsSelector(state)
});
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);