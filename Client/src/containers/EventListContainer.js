import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import NextEvent from '../components/NextEvent';
import EventListSearchBar from '../components/EventListSearchBar';
import ListView from '../components/ListView';
import organizationAndEventsSelector from '../selectors/organizationAndEventsSelector';
import Loading from '../components/Loading';

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
    nextEvent: {}
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
    const { nextEvent, user, loading, loadingUser } = this.props;
    return (
      <div>
        {!loading && !loadingUser ?
        nextEvent.eventMembers ?
          <NextEvent
            nextEvent={nextEvent}
            user={user}
            userEventMember={nextEvent.eventMembers.find((member) => {
              if (member.volunteer) {
                return member.volunteer.id === user.id;
              } else {
                return false;
              }
            })}/>
          : <h1>You haven't signed up for an event yet!</h1>
        : <Loading/> }
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
  loading: state.event.loadingNextEvent,
  events: state.event.events,
  nextEvent: state.event.nextEvent,
  user: state.account.user,
  loadingUser: state.account.loading,
  organizations: organizationAndEventsSelector(state)
});
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);