import { createContext, useState, useEffect } from "react";
import axios from 'axios';


const UserContext = createContext()

export const UserContextProvider = ({children}) => {

    const [username,setUsername] = useState("")
    const [id,setId] = useState("")

    useEffect(() => {
      axios.get('/profile').then(response => {
        setId(response.data.userId);
        setUsername(response.data.username);
      });
    }, []);

    return (
        <UserContext.Provider value={{username, setUsername, id, setId}}>{children}</UserContext.Provider>
    )
}

export default UserContext
