import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
// Loading jQuery because Microsoft's SignalR library requires it. 😷
window.jQuery = require('jquery');
window.$ = require('jquery');
require('signalr');
require('../helpers/signalR'); // SignalR script to connect to the server

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

  handleAddNewMessage(message) {
    this.setState((prevState, props) => ({
      messages: [ ...prevState.messages, Object.assign({}, message) ]
    }));
  }

  handleOnSubmit() {
    this.props.postEventChatroomMessage(this.props.params.eventId, { message: this.state.message });
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

    window.$.connection.broadcaster.client.addChatMessage = this.props.receivedNewChatroomMessage;
    window.$.connection.hub.logging = true; // for debugging
    // Connect to the SignalR server
    window.$.connection.hub.start().done(function(signalR) {
      console.log('Connected!');
      window.$.connection.broadcaster.server.subscribe(eventId);
    }).fail((error) => {
      console.error('Failed to start connection!', error);
    });
  }

  render() {
    console.log(this.props.messages);
    return (
      <div>
        Hello world!
        {this.props.messages.map((message, index) => <p key={index}>{(message.author.organizer ? '(Organizer) ' : '') + message.author.firstName + ' ' + message.author.lastName + (message.author.titles ? message.author.titles.map(title => title).join(', ') : '') + message.message}</p>)}
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