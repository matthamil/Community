import React from 'react';

const NewEventMember = (props) => (
  <div>
    <h1>New Position</h1>

    <label>Job Title</label>
    <div>{props.validationErrors.get('jobTitle')}</div>
    <input type="text" onChange={props.onChange.bind(null, 'jobTitle')}/>

    <label>Description</label>
    <div>{props.validationErrors.get('description')}</div>
    <textarea onChange={props.onChange.bind(null, 'description')}/>

    <label>Start Time</label>
    <div>{props.validationErrors.get('startTime')}</div>
    <input type="time" onChange={props.onChange.bind(null, 'startTime')}/>

    <label>End Time</label>
    <div>{props.validationErrors.get('endTime')}</div>
    <input type="time" onChange={props.onChange.bind(null, 'endTime')}/>

    <button type="button" onClick={props.onSubmit}>Add</button>
    <button type="button" onClick={props.onCancel}>Cancel</button>
  </div>
);

export default NewEventMember;