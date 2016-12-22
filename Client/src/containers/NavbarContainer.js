import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import Navbar from '../components/Navbar';

class NavbarContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.getEventList();
  }

  render() {
    return (
      <Navbar/>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(NavbarContainer);