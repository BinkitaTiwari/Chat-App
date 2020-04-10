import React from 'react';
import { Smile } from 'react-feather';



import './Input.css';



const Input = ({ setMessage, sendMessage, message,toggleEmojiPicker }) => (
  
  
  <form className="form">
    <button
                    type="button"
                    className="toggle-emoji"
                    onClick={toggleEmojiPicker}
                  >
                      <Smile />
                  </button>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
  
)

export default Input;