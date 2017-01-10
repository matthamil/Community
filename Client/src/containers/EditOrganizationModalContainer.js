import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import EditOrganizationModal from '../components/EditOrganizationModal';
import Modal from 'react-modal';

class EditOrganizationModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      city: '',
      state: '',
      validationErrors: new Map()
    };

    this.handleValidateForm = this.handleValidateForm.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChangeFormInput = this.handleOnChangeFormInput.bind(this);
    this.handleOnChangeState = this.handleOnChangeState.bind(this);
  }

  handleOnChangeFormInput(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }

  handleOnChangeState(state) {
    this.setState({
      state: state ? state.value : null
    });
  }

  handleValidateForm() {
    const validationErrors = new Map();
    if (this.state.name === '') {
      validationErrors.set('name', 'Name is required.');
    }
    if (this.state.address === '') {
      validationErrors.set('description', 'Address is required.');
    }
    if (this.state.city === '') {
      validationErrors.set('city', 'City is required.');
    }
    if (this.state.state === '' || this.state.state === null) {
      validationErrors.set('state', 'State is required.');
    }

    this.setState({
      validationErrors
    });

    return validationErrors.size === 0;
  }

  handleOnSubmit() {
    const formValidated = this.handleValidateForm();
    const { organizationId } = this.props.organization;
    if (formValidated) {
      this.props.patchOrganizationById(organizationId, {
        name: this.state.name,
        description: this.state.description,
        city: this.state.city,
        state: this.state.state,
      });
    }
    this.props.onCancel();
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    this.setState({
      name: organization.name,
      description: organization.description,
      city: organization.city,
      state: organization.state,
      validationErrors: new Map()
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isEditing}
        contentLabel="Edit Organization"
        onRequestClose={this.props.onCancel}
        className="responsiveModal"
        overlayClassName="responsiveModal--overlay">
        <EditOrganizationModal
          organization={this.props.organization}
          validationErrors={this.state.validationErrors}
          onChange={this.handleOnChangeFormInput}
          onSubmit={this.handleOnSubmit}
          selectedState={this.state.state}
          onChangeState={this.handleOnChangeState}
          onCancel={this.props.onCancel}/>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(EditOrganizationModalContainer);