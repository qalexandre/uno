import { Home } from "./Screens/Home"
import {io} from 'socket.io-client'
import { useEffect } from "react"


function App() {
  const ENDPOINT = 'http://localhost:3333'
  
  const socket = io(ENDPOINT, {})
  useEffect(() => {
    socket.connect()
  })

  const createGroup = (name: string) => {
    socket.emit('create', name)
  }

  const joinGroup = (name: string, code: string) => {
    socket.emit('')
  }
  

  return (
    <Home createGroup={createGroup} joinGroup={joinGroup} />
  )
}

export default App
