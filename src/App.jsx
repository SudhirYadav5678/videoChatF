import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Lobby from './screens/Lobby.jsx'
import Room from './screens/Room.jsx'

function App() {
  

  return (
    <>
     <Routes>
       <Route path="/" element={<Lobby />} />
       <Route path='/room/:roomid' element={<Room/>}/>
     </Routes>
    </>
  )
}

export default App
