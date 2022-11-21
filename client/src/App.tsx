
import { useEffect, useState } from "react";
import axios from 'axios'
import { ClientToServerEvents, Group, ServerToClientEvents } from "./interfaces";
export const ENDPOINT = "http://localhost:3333";
import {useSocket, useSocketEvent} from 'socket.io-react-hook'
import { BrowserRouter } from "react-router-dom"
import { Router } from "./routes/Router"

export const useSocketIo = (namespace: string) => {
  return useSocket(namespace, {autoConnect: true, enabled: true});
}




function App() {
  const [socketId, setSocketId] = useState('');
  const [room, setRoom] = useState<Group>({} as Group);
  const [isQueue, setIsQueue] = useState(false);
  const {socket, connected} = useSocket<ServerToClientEvents, ClientToServerEvents>(ENDPOINT)

  
 
  useEffect(() => {
    socket.on('error', (message) => {
      alert(message)
    })
    
  }, [socket])


  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App;
