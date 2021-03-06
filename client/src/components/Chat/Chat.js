import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages.js';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const[showEmojiPicker,setshowEmojiPicker]=useState(false);
  const ENDPOINT = 'https://chattt-ap.herokuapp.com/'
  //const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io.connect(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  const toggleEmojiPicker=()=> {
    console.log("toggle");
    setshowEmojiPicker(!showEmojiPicker);
    
  }

  const addEmoji=(emoji)=>{
    const text = `${message}${emoji.native}`;
    setMessage(text);
    setshowEmojiPicker(false);
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          {showEmojiPicker ? (
                  <Picker set="apple" onSelect={addEmoji} />
                ) : null}
          <Input message={message} 
          setMessage={setMessage} 
          sendMessage={sendMessage} 
          toggleEmojiPicker={toggleEmojiPicker} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;