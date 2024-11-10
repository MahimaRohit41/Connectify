import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useGetAllUsers = () => {
    const [allUsers,setAllUsers] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
       const getAllUsers = async () => {
            setLoading(true);
            // const token = Cookies.get("jwt");
            // console.log(token);
            await axios.get("http://localhost:4001/api/user/allusers", {
                withCredentials: "true",
              })
            .then((res) => {
                console.log(res);
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
