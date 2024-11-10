import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
        const res = await axios.post(
            `https://connectify-kek4.onrender.com/api/message/send/${selectedConversation._id}`,
            { message }, // data payload
            { withCredentials: true } // config options
        );
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;