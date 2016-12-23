import React, { PropTypes } from 'react';

const OrganizationList = ({ organizations }) => (
  <div>
    {organizations.map((org, key) => <pre key={key}>{JSON.stringify(org, null, ' ')}</pre>)}
  </div>
);

OrganizationList.propTypes = {
  organizations: PropTypes.array.isRequired
};

export default OrganizationList;