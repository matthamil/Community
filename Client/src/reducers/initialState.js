const initialState = {
  org: {
    orgById: {},
    organizations: []
  },
  eventChatroom: {},
  eventMember: {
    userEventMembers: []
  },
  user: {
    loggedIn: false
  },
  event: {
    nextEvent: {},
    events: [],
    eventById: {},
    orgEvents: []
  }
};

export default initialState;