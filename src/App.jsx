
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './views/Login'
import Register from './views/Register'
import { Main } from './views/Main'


// Default values shown


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
