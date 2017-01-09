import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
// Loading jQuery because Microsoft's SignalR library requires it. 😷
window.jQuery = require('jquery');
window.$ = require('jquery');
require('signalr');
console.log(window.$.signalR);
require('../helpers/signalR');

class EventChatroomContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      hub: window.$.connection
    };

    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleAddNewMessage = this.handleAddNewMessage.bind(this);
  }

  static defaultProps = {
    messages: [],
  }

  handleOnChangeInput(e) {
    this.setState({
      message: e.target.value
    });
  }

  componentWillMount() {
    console.log('componentWillMount: ', window.jQuery); //es-lint ignore-line

    // Thank you MDN for this function
    // const importScript = (function (oHead) {
    //   function loadError (oError) {
    //     throw new URIError("The script " + oError.target.src + " is not accessible.");
    //   }

    //   return function (sSrc, fOnload) {
    //     var oScript = document.createElement("script");
    //     oScript.onerror = loadError;
    //     if (fOnload) { oScript.onload = fOnload; }
    //     oHead.appendChild(oScript);
    //     oScript.src = sSrc;
    //   }
    // })(document.head || document.getElementsByTagName("head")[0]);
    // Promise.resolve(importScript('/signalr/hubs', function() { console.log( 'we did it?' ); }));

    // const script = document.createElement('script');
    // script.src = '/signalr/hubs';
    // script.async = false;
    // document.body.appendChild(script);
  }

  handleAddNewMessage(message) {
    this.setState((prevState, props) => ({
      messages: [ ...prevState.messages, Object.assign({}, message) ]
    }));
  }

  handleOnSubmit() {
    this.props.postEventChatroomMessage(this.props.params.eventId, { message: this.state.message })
  }

  componentDidMount() {
    if (this.props.messages) {
      this.setState({
        messages: this.props.messages
      });
    }
    const { eventId } = this.props.params;
    this.props.getEventById(eventId);
    this.props.getEventChatroomMessages(eventId);
    console.log('inside component did mount', window.$.connection);
    window.$.connection.broadcaster.client.addChatMessage = this.handleAddNewMessage;
    window.$.connection.hub.logging = true;
    window.$.connection.hub.start().done(function(signalR) {
      console.log('Connected!');
      window.$.connection.broadcaster.server.subscribe(eventId);
    }).fail((error) => {
      console.error('Failed to start connection!', error);
    });
  }

  render() {
    return (
      <div>
        Hello world!
        {this.props.messages.map((message, index) => <p key={index}>{message.author.firstName + ' ' + message.author.lastName + ' (' + message.author.title + ') ' + message.message}</p>)}
        <input type="text" onChange={this.handleOnChangeInput}/>
        <button onClick={this.handleOnSubmit}>Send</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = ({ event, account, eventChatroom }) => ({
  eventById: event.eventById,
  user: account.user,
  messages: eventChatroom.messages
});

export default connect(mapStateToProps, mapDispatchToProps)(EventChatroomContainer);