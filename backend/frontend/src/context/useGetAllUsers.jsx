import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useGetAllUsers = () => {
    const [allUsers,setAllUsers] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
       const getAllUsers = async () => {
            setLoading(true);
            await axios.get("https://connectify-kek4.onrender.com/api/user/allusers", {
                withCredentials: "true",
              })
            .then((res) => {
                setAllUsers(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
        } 

        getAllUsers();
    },[]);
  
    return [allUsers,loading];
}

export default useGetAllUsers;
