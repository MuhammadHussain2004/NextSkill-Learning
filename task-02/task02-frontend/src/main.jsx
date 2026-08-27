import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <Routes>
    <Route  path='/' element={<App/>} />
    <Route  path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Home/>} />
    </Routes>
    </BrowserRouter>

)
