
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Group } from "./interfaces";
const ENDPOINT = "http://localhost:3333";
export let socket: Socket;
import { BrowserRouter } from "react-router-dom"
import { Router } from "./routes/Router"


function App() {
  const [socketId, setSocketId] = useState('');
  const [room, setRoom] = useState<Group>({} as Group);
  const [isQueue, setIsQueue] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT, {});
    socket.connect();
    socket.on('connected', (id) => setSocketId(id) )
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('error', (message) => {
      alert(message)
    })
    socket.on('joined', (room: Group) => {
      enterRoom(room)
    })

    socket.on('update-queue', (room) => {
      setRoom(room)
    })

    socket.on('startedGame', (room) => {
      console.log(room)
    })
  }, [])

  const createGroup = async (name: string) => {
    const {data} = await axios.post(ENDPOINT + '/create')
    socket.emit('join', name, data.code);
    console.log(data);
  };

  const joinGroup = (name: string, code: string) => {
    console.log(name)
    socket.emit('join', name, code);
  };

  const leftGroup = () => {
    socket.emit('left', room.code);
    setRoom({} as Group)
    setIsQueue(false);
  }

  const enterRoom = (room: Group) => {
    setRoom(room);
    setIsQueue(true);
  }

  const startGame = () => {
    socket.emit('startGame', room);
  }

  return (
    <BrowserRouter>
      <Router startGame={startGame} leftGroup={leftGroup} socketId={socketId} isQueue={isQueue} room={room}  createGroup={createGroup} joinGroup={joinGroup} />
    </BrowserRouter>
  )
}

export default App;
