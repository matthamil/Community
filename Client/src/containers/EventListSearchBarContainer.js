import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actionCreators from '../actions/actionCreators';
import EventListSearchBar from '../components/EventListSearchBar';

class EventListSearchBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeLocation = this.handleOnChangeLocation.bind(this);
  }

  handleOnSubmit(e) {
    console.log(this.state.searchText);
  }

  handleOnChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  handleOnChangeLocation(e) {

  }

  render() {
    return (
      <EventListSearchBar
        onSubmit={this.handleOnSubmit}
        onChange={this.handleOnChange}
        onChangeLocation={this.handleOnChangeLocation}/>
    );
  }
}

export default EventListSearchBarContainer;