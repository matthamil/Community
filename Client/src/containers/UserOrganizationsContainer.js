import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { browserHistory } from 'react-router';

class UserOrganizationsContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    if (!this.props.loggedIn) {
      browserHistory.push('/');
    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        {this.props.userOrganizations.length > 0 ?
          this.props.userOrganizations.map((org, index) => <pre key={index}>{JSON.stringify(org, null, ' ')}</pre>)
        : <h1>You haven't started any organizations yet.</h1>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ account, organization }) => ({
  user: account.user,
  userOrganizations: organization.userOrganizations,
  loggedIn: account.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOrganizationsContainer);