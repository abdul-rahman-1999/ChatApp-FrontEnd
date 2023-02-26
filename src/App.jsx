import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ChatPage from './components/ChatPage'
import axios from 'axios'

function App() {
 axios.defaults.baseURL = 'https://chatapp-tbqp.onrender.com/api';
 axios.defaults.withCredentials = true
  return <>

  <Routes>
    <Route path='/chatapp/register' element={<Register/>}/>
    <Route path='/chatapp/signin' element={<Login/>}/>
    <Route path='/chatapp/chatpage' element={<ChatPage/>}/>
    </Routes>

  </>
}

export default App
