import React, { useEffect, useState, useContext, useRef } from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import UserContext from './ContextAPI/UserContext';
import {uniqBy} from 'lodash'
import axios from 'axios';
import { format } from 'timeago.js';
import NavBar from './NavBar';

function ChatPage() {

  let navigate = useNavigate()
  const [ws, setWs] = useState(null)
  const [onlinePeople,setOnlinePeople] = useState({});
  const [selectedUserId,setSelectedUserId] = useState(null);
  const [newMessageText,setNewMessageText] = useState('');
  const [messages,setMessages] = useState([]);
  let {id} = useContext(UserContext)

  
  if(id == null){
    navigate('/chatapp/signin')
  }


  

  const messaagesBoxRef = useRef()

  useEffect(() => {
    connectWS()
  },[])


  function connectWS(){
    const ws =  new WebSocket('wss://chatapp-tbqp.onrender.com/');
    setWs(ws)
    ws.addEventListener('message', handleMessage)
    ws.addEventListener('close', () => connectWS())
  }


  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({userId,username}) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }


  function handleMessage(e){
    const messageData = JSON.parse(e.data)
    if('online' in messageData){
      showOnlinePeople(messageData.online)
    }else if('text' in messageData  ){
      setMessages(prev => ([...prev, {...messageData}]))
    }
  }


  const sendMessage = (e) => {
    e.preventDefault()
     ws.send(JSON.stringify({
         recipent : selectedUserId,
         text : newMessageText
     }))
    setNewMessageText('')
    setMessages(prev => ([...prev, {
     text:newMessageText,
     sender : id,
     recipent : selectedUserId,
     _id : Date.now()
   }]))
   }


  useEffect(() =>{
  (async () => {
    if(selectedUserId){
      const res = await axios.get('/messages/' + selectedUserId)
      setMessages(res.data)
     }
  })()
  },[selectedUserId])

 
  const onlinePeopleExclOurUser = {...onlinePeople};
  delete onlinePeopleExclOurUser[id];

  const messageWithoutDupes = uniqBy(messages, '_id')


  useEffect(() => {
    const Box = messaagesBoxRef.current
    if(Box){
      Box.scrollIntoView({behaviour : 'smooth'})
    }
  },[messages])


  return <>

  <NavBar setWs={setWs}/>
  
  <Box sx={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center",margin:"0px auto",flexDirection:{xs:"column",sm:"row",md:"row"}}}>

   <Box sx={{width:{xs:"100%",sm:"25%"},backgroundColor:"#fafafa",height:{xs:"450px",sm:"90vh",md:"90vh"},display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      overflowY: "scroll",}}>{
         Object.keys(onlinePeopleExclOurUser).map((userId,i) => (
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor : userId === selectedUserId ? '#f4f4f4' : ''}} onClick={() => setSelectedUserId(userId)} key={i}>
        <Box sx={{padding:"15px"}}>{onlinePeople[userId]}</Box>
        <Box sx={{borderRadius:"50%",backgroundColor:"lightgreen",width:"10px",height:"10px",marginRight:"15px"}}></Box>
      </Box>
    )) 
   }</Box>
   
   <Box sx={{width:{xs:"100%",sm:"65%"},backgroundColor:"#f4f4f4",height:{xs:"450px",sm:"90vh",md:"90vh"},position:"relative"}}>
    {
      !selectedUserId ? <Box sx={{padding:"20px",textAlign:"center"}}>Select Users to Chat</Box> : 
      <Box sx={{display: "flex",
      flexDirection: "column",
      height: "88%",
      overflow: "hidden",
      overflowY: "scroll",}}>
        {
          messageWithoutDupes.map((e,i) => (
           (e.sender === id ?  
           <Box sx={{textAlign:"right"}} key={i}>
            <Box sx={{display:"inline-block",margin:"20px",fontWeight:600,backgroundColor:"white",padding:"20px"}}>{e.text} <br/> <span style={{fontWeight:400,color:"grey",fontSize:"10px"}}>{format(e.createdAt)}</span></Box>
            </Box>
            :
            <Box sx={{textAlign:"left"}} key={i}>
            <Box sx={{display:"inline-block",padding:"20px",fontWeight:600,margin:"20px",backgroundColor:"#f4fcff"}}>{e.text} <br/> <span style={{fontWeight:400,color:"grey",fontSize:"10px"}}>{format(e.createdAt)}</span></Box>
            </Box>)
          ))
        }
        <form style={{display:"flex",alignItems:"center",position:"absolute",bottom:0,width:"100%"}}>
        <TextField onChange={(e) => setNewMessageText(e.target.value)} sx={{padding:"10px",width:"80%"}} value={newMessageText} type="text" placeholder='Type Your Messages Here'/>
        <Button onClick={sendMessage}>
        <SendIcon sx={{color:"white",backgroundColor:"#008eff",padding:"15px 12px"}}/>
        </Button>
        </form>
        <Box ref={messaagesBoxRef}></Box>
      </Box>
    } 
    

    </Box>

  </Box>

  </>
}

export default ChatPage