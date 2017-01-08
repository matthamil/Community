import { createSelector } from 'reselect';

const eventsSelector = state => state.event.events;
const userOrganizationsSelector = state => state.organization.userOrganizations;

const getUserOrgEvents = (events, organizations) => {
  // Match up all events with their organizations
  const organizationsWithEvents = events.reduce((all, event) => {
    // array:
    //   [{ organizationId, name, ..., events: [] } }, ... ]
    const orgHostingEvent = organizations.find(o => o.organizationId === event.organization.organizationId);
    if (orgHostingEvent) {
      const orgInList = all.find(o => o.organizationId === orgHostingEvent.organizationId);
      if (orgInList) {
        orgInList.events.push(event);
      } else {
        all.push(Object.assign({}, { ...orgHostingEvent }, { events: [event] }));
      }
    }
    return all;
  }, []);

  // Find all organizations that aren't hosting any events and add them to the list
  const organizationList = organizationsWithEvents.concat(organizations.reduce((all, org) => {
    const orgInList = organizationsWithEvents.find(o => o.organizationId === org.organizationId);
    if (orgInList === undefined) {
      all.push(Object.assign({}, { ...org }, { events: [] }));
    }
    return all;
  }, []));

  return organizationList;
};

export default createSelector(
  eventsSelector, // pick off a piece of state
  userOrganizationsSelector, // pick off a piece of state
  getUserOrgEvents // last argument is the function that has our select logic
);