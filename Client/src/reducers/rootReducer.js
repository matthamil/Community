import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import other reducers
import { organizationReducer } from './organizationReducer';
import { eventReducer } from './eventReducer';
import { eventMemberReducer } from './eventMemberReducer';
import { eventChatroomMessageReducer } from './eventChatroomMessageReducer';

const rootReducer = combineReducers({
  organization: organizationReducer,
  event: eventReducer,
  eventMember: eventMemberReducer,
  eventChatroom: eventChatroomMessageReducer,
  routing: routerReducer
});

export default rootReducer;
