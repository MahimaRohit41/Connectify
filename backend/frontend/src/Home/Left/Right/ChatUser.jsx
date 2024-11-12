import React from "react";
import { CiMenuFries } from "react-icons/ci";
import useConversation from "../../../zustand/useConversation";
import { useSocketContext } from "../../../context/socketContext";

// import profile from "../../../public/user.jpg"; // getting photo from public folder.

function Chatuser() {
      const { selectedConversation } = useConversation();
      const { onlineUsers } = useSocketContext();
      const getOnlineUsersStatus = (userId) => {
        return onlineUsers.includes(userId) ? "Online" : "Offline";
      };

    return (
        <div className="relative flex items-center h-[8vh] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
            <label
                htmlFor="my-drawer-2"
                className="btn btn-ghost drawer-button lg:hidden absolute left-5"
            >
                <CiMenuFries className="text-white text-xl" />
            </label>
            <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
                <div className={`avatar placeholder ${getOnlineUsersStatus(selectedConversation._id) == "Online" ? "online" : ""}`}>
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span className="text-3xl">{selectedConversation.name[0].toUpperCase()}</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl">{selectedConversation?.name}</h1>
                    <span className="text-sm">
                        {getOnlineUsersStatus(selectedConversation._id)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Chatuser;