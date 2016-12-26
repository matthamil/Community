import React from 'react';
import { Route, IndexRoute } from 'react-router';
import NavbarContainer from './containers/NavbarContainer';
import EventListContainer from './containers/EventListContainer';
import SingleEventContainer from './containers/SingleEventContainer';
import SingleOrganizationContainer from './containers/SingleOrganizationContainer';
import UserEventMemberListContainer from './containers/UserEventMemberListContainer';
import NewOrganizationContainer from './containers/NewOrganizationContainer';

export default (
  <Route path="/" component={NavbarContainer}>
    <IndexRoute component={EventListContainer}/>
    <Route path="organizations/new" component={NewOrganizationContainer}/>
    <Route path="organizations/:id" component={SingleOrganizationContainer}/>
    <Route path="events" component={UserEventMemberListContainer}/>
    <Route path="events/:id" component={SingleEventContainer}/>
  </Route>
);