import React, { useEffect, useState, useCallback} from 'react'
import { Socket } from 'socket.io-client';
import {useSocket} from "../context/SocketProvider.jsx"
import { useNavigate } from 'react-router-dom';

function Lobby() {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("")

    const navigate= useNavigate();

    const socket = useSocket();

    const handleSubmit = useCallback((event)=>{
        event.preventDefault();
        socket.emit('room-join',{email, room})
    },[email, room, socket])

    const handlejoin =useCallback((data)=>{
      const {email, room}= data
      navigate(`/room/${room}`)
    },[navigate])

    useEffect(()=>{
      socket.on('room-join',handlejoin)
      return ()=>{
        socket.off('room-join',handlejoin)
      }
    },[socket,handlejoin])

  return (
    <>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input type="email" id='email' value={email} onChange={(event)=>{
            setEmail(event.target.value)
        }}/> <br />
        <label htmlFor='room'>Room No </label>
        <input type="text" id='room' value={room} onChange={(event)=>{
            setRoom(event.target.value)}} />
        <br />
        <button>Join</button>
      </form>
    </>
  )
}

export default Lobby