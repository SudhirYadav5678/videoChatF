import React,{useCallback, useEffect, useState} from 'react'
import { useSocket } from '../context/SocketProvider.jsx'
import ReactPlayer from 'react-player'
import peer from "../services/peer.js";


function Room() {
    const socket = useSocket()
    const [joined, setJoined] = useState(null);
    const [mystrem, setMystrem] = useState();
    const handlejoin = useCallback(({email, id})=>{
        console.log(`email :${email} id ${id}`);
        setJoined({email, id})
    })

    const handleCall = useCallback(async()=>{
      //console.log("sudhir");
      const strem = await navigator.mediaDevices.getUserMedia({audio:true, video:true})
      const offer =  await peer.getOffer();
      socket.emit('user:call',{to:joined, offer})
      setMystrem(strem)
    },[joined, socket])
    
    const handleInCall = useCallback(async({from , offer})=>{
      const ans = peer.getAnswer(offer);
      setJoined(from)
      const strem = await navigator.mediaDevices.getUserMedia({audio:true, video:true})
      setMystrem(strem)
      socket.emit('user:answer',{to:from, ans})

    },[])

    const handleAnsCall = useCallback(({from, ans})=>{
      peer.setLocalDescription(ans)
      console.log("call accepted");
    },[])
    useEffect(() => {
        socket.on('user:joined',handlejoin)
        socket.on('incomming:call',handleInCall)
        socket.on('user:answer',handleAnsCall)

        return () => {
            socket.off('user:joined',handlejoin)
            socket.off('incomming:call',handleInCall)
            socket.off('user:answer',handleAnsCall)
        }
        
    },[socket, handlejoin, handleInCall])

  return (
    <>
    <div>Room </div>
    <h1>{joined?"joined":"notJoined"}</h1>
    {joined && <button onClick={handleCall}>Call</button>}
    {mystrem && <ReactPlayer playing muted height="200px" width="200px" url={mystrem}/>}
    </>
  )
}

export default Room