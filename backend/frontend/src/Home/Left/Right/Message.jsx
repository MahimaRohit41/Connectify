import React from 'react';
import useGetMessage from '../../../context/useGetMessage';

const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser?.user?._id;

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createdAt = message.createdAt ? new Date(message.createdAt) : new Date();
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true  
  });
  
  return (
    <div>
      <div className="p-2">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  )
};

export default Message;
