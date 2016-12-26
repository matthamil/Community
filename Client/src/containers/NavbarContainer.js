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
  }

  render() {
    const { user, userOrganizations, loggedIn } = this.props;
    return (
      <div>
        <Navbar
          loggedIn={loggedIn}
          user={user}
          userOrganizations={userOrganizations}/>
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ account, organization }) => ({
  user: { account },
  loggedIn: account.loggedIn,
  userOrganizations: organization.userOrganizations
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);