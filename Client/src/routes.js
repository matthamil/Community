import React from 'react';
import { Route, IndexRoute } from 'react-router';
import NavbarContainer from './containers/NavbarContainer';
import EventListContainer from './containers/EventListContainer';
import SingleEventContainer from './containers/SingleEventContainer';

export default (
  <Route path="/" component={NavbarContainer}>
    <IndexRoute component={EventListContainer}/>
    <Route path="events/:id" component={SingleEventContainer}/>
  </Route>
);