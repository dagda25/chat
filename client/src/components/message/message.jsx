import React from "react";
import './message.css';

const Message = ({message, userId}) => {
  if (!message) {
    return false;
  }

  return (
    <div className={userId === message.author ? `message message-sent` : `message message-received`}>
      {message.message}
      <span>{new Date(message.date).toLocaleTimeString()}</span>
    </div>
  );
};


export default Message;
