import React from 'react';
import Select from 'react-select';
import unitedStatesList from '../helpers/unitedStatesList';

const NewOrganization = ({ validationErrors, onChange, onSubmit, onChangeState, selectedState }) => (
  <div>
    <h1>New Organization</h1>

    <label>Name</label>
    <div>{validationErrors.get('name')}</div>
    <input type="text" onChange={onChange.bind(null, 'name')}/>

    <label>Description</label>
    <div>{validationErrors.get('description')}</div>
    <input type="text" onChange={onChange.bind(null, 'description')}/>

    <label>City</label>
    <div>{validationErrors.get('city')}</div>
    <input type="text" onChange={onChange.bind(null, 'city')}/>

    <label>State</label>
    <div>{validationErrors.get('state')}</div>
    <Select
      name="organization-state"
      value={selectedState}
      options={unitedStatesList}
      onChange={onChangeState}/>

    <button type="button" onClick={onSubmit}>Submit</button>
  </div>
);

export default NewOrganization;