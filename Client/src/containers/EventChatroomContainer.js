import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { Link } from 'react-router';
import moment from 'moment';
import styled from 'styled-components';
// Loading jQuery because Microsoft's SignalR library requires it. 😷
window.jQuery = require('jquery');
window.$ = require('jquery');
require('signalr');
require('../helpers/signalR'); // SignalR script to connect to the server

const Wrapper = styled.div`
  height: 500px;
  margin: 20px 0;
`;

const BackBtn = styled(Link)`
  background-color: #E74C3C;
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  display: inline-block;
  color: #fff;
  height: 44px;
  margin-left: 10vw;
  margin-bottom: 20px;
  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 80vw;
  max-width: 80vw;
  margin: 0 auto;
`;

const Chatbox = styled.div`
  overflow: auto;
  height: 80%;
  width: 80vw;
  background-color: #fff;
  padding: 5px;
  margin: 0 auto;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 3px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  border-radius: 3px;
  border: none;
  padding: 10px;
  color: #000;
  font-size: 16px;
  display: block;
  width: 80%;
  border: 1px solid rgb(238, 238, 238);
`;

const Send = styled.button`
  background-color: rgb(35, 218, 91);
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  display: inline-block;
  color: #fff;
  height: 44px;
`;

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
    messages: []
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
    this.setState({
      message: ''
    });
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

    // Scroll into view upon initialization
    const length = this.props.messages.length - 1;
    const node = ReactDOM.findDOMNode(this['_div' + length]);
    if (node) {
      node.scrollIntoView();
    }
  }

  componentDidUpdate() {
    // Scroll into view when new messages are received
    const length = this.props.messages.length - 1;
    const node = ReactDOM.findDOMNode(this['_div' + length]);
    if (node) {
      node.scrollIntoView();
    }
  }

  componentWillUnmount() {
    window.$.connection.broadcaster.server.unsubscribe(this.props.params.eventId);
  }

  render() {
    return (
      <Wrapper>
        <BackBtn to={`/events/${this.props.params.eventId}`}>Back</BackBtn>
        <Chatbox>
        {this.props.messages.map((message, index) =>
          <div key={index} ref={ref => this['_div' + index] = ref}>
            {message.author.organizer?
              <div>
                <i className="fa fa-star" aria-hidden="true"></i>
                Organizer
              </div>
            : ''}
            <div>
              {moment(new Date(message.timestamp)).format('L')} {moment(new Date(message.timestamp)).format('LTS')}
            </div>
            <div>
              {message.author.firstName + ' ' + message.author.lastName}
            </div>
            {message.author.titles ?
            <div>
              {message.author.titles.map(title => title).join(', ')}
            </div>
            : ''}
            <div>
              {message.message}
            </div>
            <hr/>
          </div>)}
        </Chatbox>
        <InputWrapper>
          <Input type="text" value={this.state.message} onChange={this.handleOnChangeInput}/>
          <Send onClick={this.handleOnSubmit}>Send</Send>
        </InputWrapper>
      </Wrapper>
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