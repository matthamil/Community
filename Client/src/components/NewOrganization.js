import React from 'react';

const NewOrganization = ({ validationErrors, onChange, onSubmit }) => (
  <div>
    <h1>New Organization</h1>

    <label>Name</label>
    <div>{validationErrors.get('name')}</div>
    <input type="text" onChange={onChange.bind(null, 'name')}/>

    <label>Description</label>
    {validationErrors.get('description') ? <div>{validationErrors.get('name')}</div> : ''}
    <input type="text" onChange={onChange.bind(null, 'description')}/>

    <label>City</label>
    {validationErrors.get('city') ? <div>{validationErrors.get('city')}</div> : ''}
    <input type="text" onChange={onChange.bind(null, 'city')}/>

    <label>State</label>
    {validationErrors.get('state') ? <div>{validationErrors.get('state')}</div> : ''}
    <input type="text" onChange={onChange.bind(null, 'state')}/>

    <button type="button" onClick={onSubmit}>Submit</button>
  </div>
);

export default NewOrganization;