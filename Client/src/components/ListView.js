import React, { PropTypes } from 'react';
import EventList from './EventList';
import OrganizationList from './OrganizationList';

const ListView = (props) => (
  <div>
  {props.searchType === 'event' ?
    <EventList events={props.events}/>
  : <OrganizationList organizations={props.organizations}/>}
  </div>
);

ListView.propTypes = {
  events: PropTypes.array,
  organizations: PropTypes.array
};

export default ListView;