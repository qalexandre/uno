import { Home } from "./Screens/Home";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Group } from "./interfaces";
const ENDPOINT = "http://localhost:3333";
let socket: Socket;

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
    socket.on('error-name', () => {
      alert('Nome já existe')
    })
    socket.on('joined', (room: Group) => {
      enterRoom(room)
    })

    socket.on('update-queue', (room) => {
      setRoom(room)
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

  const enterRoom = (room: Group) => {
    setRoom(room);
    setIsQueue(true);
  }

  return <Home isQueue={isQueue} room={room} createGroup={createGroup} joinGroup={joinGroup} />;
}

export default App;
