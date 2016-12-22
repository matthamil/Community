import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import other reducers
import organizationReducer from './organizationReducer';
import eventReducer from './eventReducer';
import eventMemberReducer from './eventMemberReducer';
import eventChatroomMessageReducer from './eventChatroomMessageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  organization: organizationReducer,
  event: eventReducer,
  eventMember: eventMemberReducer,
  eventChatroom: eventChatroomMessageReducer,
  routing: routerReducer,
  account: userReducer
});

export default rootReducer;
