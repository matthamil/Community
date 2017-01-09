import * as actions from './actionTypes';

// * Organization Action Creators *
export const getOrganizationList = (city, state) => ({
  type: actions.GET_ORGANIZATION_LIST,
  payload: { city, state }
});
export const getOrganizationListSuccess = (organizations) => ({
  type: actions.GET_ORGANIZATION_LIST_SUCCESS,
  payload: { organizations }
});
export const getOrganizationListFailure = (error) => ({
  type: actions.GET_ORGANIZATION_LIST_FAILURE,
  payload: { error }
});

export const getOrganizationById = (id) => ({
  type: actions.GET_ORGANIZATION_BY_ID,
  payload: { id }
});
export const getOrganizationByIdSuccess = (organizations) => ({
  type: actions.GET_ORGANIZATION_BY_ID_SUCCESS,
  payload: { organizations }
});
export const getOrganizationByIdFailure = (error) => ({
  type: actions.GET_ORGANIZATION_BY_ID_FAILURE,
  payload: { error }
});

export const getOrganizationsByOrganizerId = (id) => ({
  type: actions.GET_ORGANIZATIONS_BY_ORGANIZER_ID,
  payload: { id }
});
export const getOrganizationsByOrganizerIdSuccess = (organizations) => ({
  type: actions.GET_ORGANIZATIONS_BY_ORGANIZER_ID_SUCCESS,
  payload: { organizations }
});
export const getOrganizationsByOrganizerIdFailure = (error) => ({
  type: actions.GET_ORGANIZATIONS_BY_ORGANIZER_ID_SUCCESS,
  payload: { error }
});

export const postOrganization = (organization) => ({
  type: actions.POST_ORGANIZATION,
  payload: { organization }
});
export const postOrganizationSuccess = (organization) => ({
  type: actions.POST_ORGANIZATION_SUCCESS,
  payload: { organization }
});
export const postOrganizationFailure = (error) => ({
  type: actions.POST_ORGANIZATON_FAILURE,
  payload: { error }
});

export const patchOrganizationById = (id, organization) => ({
  type: actions.PATCH_ORGANIZATION_BY_ID,
  payload: { id, organization }
});
export const patchOrganizationByIdSuccess = (organization) => ({
  type: actions.PATCH_ORGANIZATION_BY_ID_SUCCESS,
  payload: { organization }
});
export const patchOrganizationByIdFailure = (error) => ({
  type: actions.PATCH_ORGANIZATION_BY_ID_FAILURE,
  payload: { error }
});

export const deleteOrganization = (id) => ({
  type: actions.DELETE_ORGANIZATION,
  payload: { id }
});
export const deleteOrganizationSuccess = (id) => ({
  type: actions.DELETE_ORGANIZATION_SUCCESS,
  payload: { id }
});
export const deleteOrganizationFailure = (error) => ({
  type: actions.DELETE_ORGANIZATION_FAILURE,
  payload: { error }
});
// * END Organization Action Creators *

// * Event Action Creators *
export const getEventList = (city, state) => ({
  type: actions.GET_EVENT_LIST,
  payload: { city, state }
});
export const getEventListSuccess = (events) => ({
  type: actions.GET_EVENT_LIST_SUCCESS,
  payload: { events }
});
export const getEventListFailure = (error) => ({
  type: actions.GET_EVENT_LIST_FAILURE,
  payload: { error }
});

export const getEventById = (id) => ({
  type: actions.GET_EVENT_BY_ID,
  payload: { id }
});
export const getEventByIdSuccess = (event) => ({
  type: actions.GET_EVENT_BY_ID_SUCCESS,
  payload: { event }
});
export const getEventByIdFailure = (error) => ({
  type: actions.GET_EVENT_BY_ID_FAILURE,
  payload: { error }
});

export const getEventsByOrganizationId = (id) => ({
  type: actions.GET_EVENTS_BY_ORGANIZATION_ID,
  payload: { id }
});
export const getEventsByOrganizationIdSuccess = (events, id) => ({
  type: actions.GET_EVENTS_BY_ORGANIZATION_ID_SUCCESS,
  payload: { events, id }
});
export const getEventsByOrganizationIdFailure = (error) => ({
  type: actions.GET_EVENTS_BY_ORGANIZATION_ID_FAILURE,
  payload: { error }
});

export const getNextEvent = () => ({
  type: actions.GET_NEXT_EVENT
});
export const getNextEventSuccess = (event) => ({
  type: actions.GET_NEXT_EVENT_SUCCESS,
  payload: event
});
export const getNextEventFailure = (error) => ({
  type: actions.GET_NEXT_EVENT_FAILURE,
  payload: { error }
});

export const postEvent = (event) => ({
  type: actions.POST_EVENT,
  payload: { event }
});
export const postEventSuccess = (event) => ({
  type: actions.POST_EVENT_SUCCESS,
  payload: { event }
});
export const postEventFailure = (error) => ({
  type: actions.POST_EVENT_FAILURE,
  payload: { error }
});

export const patchEventById = (id, event) => ({
  type: actions.PATCH_EVENT_BY_ID,
  payload: { id, event }
});
export const patchEventByIdSuccess = (event) => ({
  type: actions.PATCH_EVENT_BY_ID_SUCCESS,
  payload: { event }
});
export const patchEventByIdFailure = (error) => ({
  type: actions.PATCH_EVENT_BY_ID_FAILURE,
  payload: { error }
});

export const deleteEvent = (id) => ({
  type: actions.DELETE_EVENT,
  payload: { id }
});
export const deleteEventSuccess = () => ({
  type: actions.DELETE_EVENT_SUCCESS
});
export const deleteEventFailure = (error) => ({
  type: actions.DELETE_EVENT_FAILURE,
  payload: { error }
});
// * END Event Action Creators *

// * Event Member Action Creators *
export const getEventMembers = () => ({
  type: actions.GET_EVENT_MEMBERS
});
export const getEventMembersSuccess = (userEventMembers) => ({
  type: actions.GET_EVENT_MEMBERS_SUCCESS,
  payload: { userEventMembers }
});
export const getEventMembersFailure = (error) => ({
  type: actions.GET_EVENT_MEMBERS_FAILURE,
  payload: { error }
});

export const getEventMemberById = (id) => ({
  type: actions.GET_EVENT_MEMBER_BY_ID,
  payload: { id }
});
export const getEventMemberByIdSuccess = (eventMember) => ({
  type: actions.GET_EVENT_MEMBER_BY_ID_SUCCESS,
  payload: { eventMember }
});
export const getEventMemberByIdFailure = (error) => ({
  type: actions.GET_EVENT_MEMBER_BY_ID_FAILURE,
  payload: { error }
});

export const postEventMember = (eventMember) => ({
  type: actions.POST_EVENT_MEMBER,
  payload: { eventMember }
});
export const postEventMemberSuccess = (eventMember) => ({
  type: actions.POST_EVENT_MEMBER_SUCCESS,
  payload: { eventMember }
});
export const postEventMemberFailure = (error) => ({
  type: actions.POST_EVENT_MEMBER_FAILURE,
  payload: { error }
});

export const patchEventMemberById = (id, eventMember) => ({
  type: actions.PATCH_EVENT_MEMBER,
  payload: { id, eventMember }
});
export const patchEventMemberByIdSuccess = (eventMember) => ({
  type: actions.PATCH_EVENT_MEMBER_SUCCESS,
  payload: { eventMember }
});
export const patchEventMemberByIdFailure = (error) => ({
  type: actions.PATCH_EVENT_MEMBER_FAILURE,
  payload: { error }
});

export const claimEventMember = (id) => ({
  type: actions.CLAIM_EVENT_MEMBER,
  payload: { id }
});
export const claimEventMemberSuccess = (eventMember) => ({
  type: actions.CLAIM_EVENT_MEMBER_SUCCESS,
  payload: { eventMember }
});
export const claimEventMemberFailure = (error) => ({
  type: actions.CLAIM_EVENT_MEMBER_FAILURE,
  payload: { error }
});

export const unclaimEventMember = (id) => ({
  type: actions.UNCLAIM_EVENT_MEMBER,
  payload: { id }
});
export const unclaimEventMemberSuccess = (eventMember) => ({
  type: actions.UNCLAIM_EVENT_MEMBER_SUCCESS,
  payload: { eventMember }
});
export const unclaimEventMemberFailure = (error) => ({
  type: actions.UNCLAIM_EVENT_MEMBER_FAILURE,
  payload: { error }
});

export const deleteEventMember = (id) => ({
  type: actions.DELETE_EVENT_MEMBER,
  payload: { id }
});
export const deleteEventMemberSuccess = (id) => ({
  type: actions.DELETE_EVENT_MEMBER_SUCCESS,
  payload: { id }
});
export const deleteEventMemberFailure = (error) => ({
  type: actions.DELETE_EVENT_MEMBER_FAILURE,
  payload: { error }
});
// * END Event Member Action Creators *

// * Event Chatroom Message Action Creators *
export const getEventChatroomMessages = (id) => ({
  type: actions.GET_EVENT_CHATROOM_MESSAGES,
  payload: { id }
});
export const getEventChatroomMessagesSuccess = (messages) => ({
  type: actions.GET_EVENT_CHATROOM_MESSAGES_SUCCESS,
  payload: { messages }
});
export const getEventChatroomMessagesFailure = (error) => ({
  type: actions.GET_EVENT_CHATROOM_MESSAGES_FAILURE,
  payload: { error }
});

export const postEventChatroomMessage = (eventId, message) => ({
  type: actions.POST_EVENT_CHATROOM_MESSAGE,
  payload: { eventId, message }
});
export const postEventChatroomMessageSuccess = (message) => ({
  type: actions.POST_EVENT_CHATROOM_MESSAGE_SUCCESS,
  payload: { message }
});
export const postEventChatroomMessageFailure = (error) => ({
  type: actions.POST_EVENT_CHATROOM_MESSAGE_FAILURE,
  payload: { error }
});

export const patchEventChatroomMessage = (eventId, messageId, message) => ({
  type: actions.PATCH_EVENT_CHATROOM_MESSAGE,
  payload: { eventId, messageId, message }
});
export const patchEventChatroomMessageSuccess = (message) => ({
  type: actions.PATCH_EVENT_CHATROOM_MESSAGE_SUCCESS,
  payload: { message }
});
export const patchEventChatroomMessageFailure = (error) => ({
  type: actions.PATCH_EVENT_CHATROOM_MESSAGE_FAILURE,
  payload: { error }
});

export const deleteEventChatroomMessage = (id) => ({
  type: actions.DELETE_EVENT_CHATROOM_MESSAGE,
  payload: { id }
});
export const deleteEventChatroomMessageSuccess = (id) => ({
  type: actions.DELETE_EVENT_CHATROOM_MESSAGE_SUCCESS,
  payload: { id }
});
export const deleteEventChatroomMessageFailure = (error) => ({
  type: actions.DELETE_EVENT_CHATROOM_MESSAGE_FAILURE,
  payload: { error }
});
// * END Event Chatroom Message Action Creators *

// * User Action Creators *
export const getUser = () => ({
  type: actions.GET_USER
});
export const getUserSuccess = (user) => ({
  type: actions.GET_USER_SUCCESS,
  payload: user
});
export const getUserFailure = (error) => ({
  type: actions.GET_USER_FAILURE,
  payload: { error }
});
// * END User Action Creators *