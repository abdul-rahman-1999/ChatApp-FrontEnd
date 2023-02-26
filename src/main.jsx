import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider  } from './components/ContextAPI/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </UserContextProvider>
)
