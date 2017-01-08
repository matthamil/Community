import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import UserOrganizationsItemListContainer from './UserOrganizationsItemListContainer';
import userOrganizationsEventsSelector from '../selectors/userOrganizationEventsSelector';

class UserOrganizationsContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    // if (!this.props.loggedIn) {
    //   browserHistory.push('/');
    // }
  }

  componentDidMount() {
    this.props.getEventList('Nashville', 'TN');
  }

  render() {
    const { userOrganizations } = this.props;
    return (
      <div>
        <UserOrganizationsItemListContainer
          userOrganizations={userOrganizations}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = (state) => ({
  user: state.account.user,
  userOrganizations: userOrganizationsEventsSelector(state),
  loggedIn: state.account.loggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOrganizationsContainer);