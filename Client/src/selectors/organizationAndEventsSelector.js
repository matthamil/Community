import { createSelector } from 'reselect';

const eventsSelector = state => state.event.events;
const organizationsSelector = state => state.organization.organizations;

const getOrgAndEvents = (events, organizations) => {
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

  return organizationList.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() );
};

export default createSelector(
  eventsSelector,
  organizationsSelector,
  getOrgAndEvents
);