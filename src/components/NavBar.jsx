import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UserContext from './ContextAPI/UserContext';
import axios from 'axios';

function NavBar({setWs}) {
    let navigate = useNavigate()
    let {username,setUsername,setId} = useContext(UserContext)
    async function logOut() {
      const res =  await axios.post('/logout',{
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method:"POST",
      }).then(() => {
          setWs(null);
          setId(null);
          setUsername(null);
        });
        navigate('/chatapp/signin')
      }
  return <>
  
  <Box sx={{width:"100%",height:"70px",display:"flex",alignItems:"center",justifyContent:"space-between",backgroundColor:"#a9d288"}}>

    <Box><QuickreplyIcon sx={{color:"#f4f4f4",width:"30px",height:"30px",margin:"20px"}}/></Box>
    <Box sx={{fontWeight:500}}>{username}</Box>
    <Box onClick={logOut}><ExitToAppIcon sx={{color:"#f4f4f4",width:"30px",height:"30px",margin:"20px"}}/></Box>

  </Box>

  </>
}

export default NavBar