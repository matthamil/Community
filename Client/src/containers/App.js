import React, { Component } from 'react';
import NavbarContainer from './NavbarContainer';
import EventListContainer from './EventListContainer';

class App extends Component {
  render() {
    return (
      <div>
        <NavbarContainer/>
        <EventListContainer/>
      </div>
    );
  }
}

export default App;
