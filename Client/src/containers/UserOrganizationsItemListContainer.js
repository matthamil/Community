import React, { Component } from 'react';
import UserOrganizationsItemList from '../components/UserOrganizationsItemList';

class UserOrganizationsItemListContainer extends Component {
  render() {
    return (
      <UserOrganizationsItemList
        userOrganizations={this.props.userOrganizations}/>
    );
  }
}

export default UserOrganizationsItemListContainer;
