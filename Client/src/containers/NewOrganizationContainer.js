import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import NewOrganization from '../components/NewOrganization';
import { browserHistory } from 'react-router';

class NewOrganizationContainer extends Component {
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
    this.handleOnCancel = this.handleOnCancel.bind(this);
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
    const { name, description, city, state } = this.state;
    const validationErrors = new Map();
    if (name === '') {
      validationErrors.set('name', 'Name is required.');
    }
    if (description === '') {
      validationErrors.set('description', 'Description is required.');
    }
    if (city === '') {
      validationErrors.set('city', 'City is required.');
    }
    if (state === '' || state === null) {
      validationErrors.set('state', 'State is required.');
    }
    this.setState({
      validationErrors
    });

    return validationErrors.size === 0;
  }

  handleOnSubmit() {
    const formValidated = this.handleValidateForm();
    if (formValidated) {
      const { name, description, city, state } = this.state;
      this.props.postOrganization({
        name,
        description,
        city,
        state
      });
    }
  }

  handleOnCancel() {
    browserHistory.push('/organizations/');
  }

  componentWillMount() {
    // if (!this.props.loggedIn) {
    //   browserHistory.push('/');
    // }
  }

  render() {
    return (
      <NewOrganization
        validationErrors={this.state.validationErrors}
        onChange={this.handleOnChangeFormInput}
        onSubmit={this.handleOnSubmit}
        onCancel={this.handleOnCancel}
        selectedState={this.state.state}
        onChangeState={this.handleOnChangeState}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ account }) => ({ loggedIn: account.loggedIn });
export default connect(mapStateToProps, mapDispatchToProps)(NewOrganizationContainer);