import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/socketContext';

const User = ({user}) => {
    const { onlineUsers } = useSocketContext();
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const isOnline = onlineUsers.includes(user._id);
    return (
        <div onClick={() => setSelectedConversation(user)} className={`hover:bg-slate-600 duration-300 ${
            isSelected ? "bg-slate-700" : ""
          }`}>
            <div className='flex space-x-4 px-6 py-3 hover:bg-slate-700 duration-300 cursor-pointer'>
            <div className={`avatar placeholder ${isOnline? "online": ""}`}>
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span className="text-3xl">{user.name[0].toUpperCase()}</span>
                </div>
            </div>
            <div>
                <h1 className='font-bold'>{user.name}</h1>
                <span>{user.email}</span>
            </div>
        </div>
        </div>
    )
};

export default User;