import React from 'react';
import Select from 'react-select';
import unitedStatesList from '../helpers/unitedStatesList';

const NewEvent = (props) => (
  <div>
    <h1>New Event</h1>

    <label>Organization</label>
    <Select
      name="organization"
      value={props.selectedOrganization}
      options={props.userOrganizations}
      onChange={props.onChangeOrganization}/>

    <label>Name</label>
    <div>{props.validationErrors.get('name')}</div>
    <input type="text" onChange={props.onChange.bind(null, 'name')}/>

    <label>Description</label>
    <div>{props.validationErrors.get('description')}</div>
    <textarea onChange={props.onChange.bind(null, 'description')}/>

    <label>Date</label>
    <div>{props.validationErrors.get('date')}</div>
    <input type="date" onChange={props.onChange.bind(null, 'date')}/>

    {/* Time stuff goes here */}
    <label>Start Time</label>
    <div>{props.validationErrors.get('startTime')}</div>
    <input type="time" onChange={props.onChange.bind(null, 'startTime')}/>

    <label>End Time</label>
    <div>{props.validationErrors.get('endTime')}</div>
    <input type="time" onChange={props.onChange.bind(null, 'endTime')}/>

    <label>Address</label>
    <div>{props.validationErrors.get('address')}</div>
    <input type="text" onChange={props.onChange.bind(null, 'address')}/>

    <label>City</label>
    <div>{props.validationErrors.get('city')}</div>
    <input type="text" onChange={props.onChange.bind(null, 'city')}/>

    <label>State</label>
    <div>{props.validationErrors.get('state')}</div>
    <Select
      name="organization-state"
      value={props.selectedState}
      options={unitedStatesList}
      onChange={props.onChangeState}/>

    <label>ZIP Code</label>
    <div>{props.validationErrors.get('zipCode')}</div>
    <input type="text" onChange={props.onChange.bind(null, 'zipCode')}/>

    <button type="button" onClick={props.onSubmit}>Submit</button>
  </div>
);

export default NewEvent;