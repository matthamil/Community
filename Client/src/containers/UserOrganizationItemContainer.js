import React, { Component } from 'react';
import EditOrganizationModalContainer from './EditOrganizationModalContainer';
import UserOrganizationItem from '../components/UserOrganizationItem';
import EventListDropdown from '../components/EventListDropdown';
import Collapse from 'react-collapse';

class UserOrganizationItemContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      dropDownActive: false,
    };

    this.handleOnClickEdit = this.handleOnClickEdit.bind(this);
    this.handleOnClickShowDropDown = this.handleOnClickShowDropDown.bind(this);
  }

  handleOnClickEdit() {
    this.setState((prevState, props) => ({ isEditing: !prevState.isEditing }));
  }

  handleOnClickShowDropDown() {
    this.setState((prevState, props) => ({ dropDownActive: !prevState.dropDownActive }));
  }

  render() {
    const { organization } = this.props;
    return (
      <div>
        <UserOrganizationItem
          organization={organization}
          dropDownActive={this.state.dropDownActive}
          borderBottom={this.props.borderBottom}
          onClickToggleDropDown={this.handleOnClickShowDropDown}
          onClickEdit={this.handleOnClickEdit}>
          <Collapse
            isOpened={this.state.dropDownActive}
            springConfig={{stiffness: 200, damping: 20}}>
            <EventListDropdown
              events={organization.events}
              onClickCancel={this.handleOnClickShowDropDown}
              id={organization.organizationId}/>
          </Collapse>
        </UserOrganizationItem>
        <EditOrganizationModalContainer
          organization={organization}
          onCancel={this.handleOnClickEdit}
          isEditing={this.state.isEditing}/>
      </div>
    );
  }
}

export default UserOrganizationItemContainer;