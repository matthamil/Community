import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import SingleOrganization from '../components/SingleOrganization';
import EditOrganizationModalContainer from './EditOrganizationModalContainer';

class SingleOrganizationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.handleOnClickEditOrganization = this.handleOnClickEditOrganization.bind(this);
    this.handleOnClickDeleteOrganization = this.handleOnClickDeleteOrganization.bind(this);
  }

  static defaultProps = {
    userIsOrganizer: false,
    orgById: { organizationId: null, organizer: { id: null } },
    user: { id: null }
  }

  componentDidMount() {
    const id = this.props.params.id;
    this.props.getOrganizationById(id);
  }

  handleOnClickEditOrganization() {
    this.setState((prevState, props) => ({ isEditing: !prevState.isEditing }));
  }

  handleOnClickDeleteOrganization() {
    const { orgById } = this.props;
    this.props.deleteOrganization(orgById.organizationId);
  }

  render() {
    const { orgById, events, user } = this.props;
    return (
      <div>
      {Object.keys(orgById).length > 0 && events ?
      <SingleOrganization
        organization={orgById}
        events={events}
        onClickEdit={this.handleOnClickEditOrganization}
        onClickDelete={this.handleOnClickDeleteOrganization}
        userIsOrganizer={orgById && user ? orgById.organizer.id === user.id : false}>
        <EditOrganizationModalContainer
          organization={orgById}
          isEditing={this.state.isEditing}
          onCancel={this.handleOnClickEditOrganization}/>
      </SingleOrganization>
      : 'Loading...' }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ organization, event, account }) => ({
  orgById: organization.orgById,
  events: event.orgEvents,
  user: account.user
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrganizationContainer);