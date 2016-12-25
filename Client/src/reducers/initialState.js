const initialState = {
  org: {
    orgById: {},
    organizations: []
  },
  eventChatroom: {},
  eventMember: {},
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