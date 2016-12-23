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
    this.props.getUser();
    this.props.getEventList('Nashville', 'TN');
    this.props.getNextEvent();
    this.props.getOrganizationList('Nashville', 'TN');
  }

  render() {
    const { user, loggedIn } = this.props;
    return (
      <Navbar
        loggedIn={loggedIn}
        user={user}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ account }) => ({ user: { account }, loggedIn: { account } });

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);