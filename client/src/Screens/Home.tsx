import { useEffect, useState } from "react";
import { Join } from "../Components/Join";
import { Queue } from "../Components/Queue";
import {
  ClientToServerEvents,
  Group,
  ServerToClientEvents,
} from "../interfaces";
import { useSocket } from "socket.io-react-hook";
import { ENDPOINT } from "../App";
import axios from "axios";
import { useRoom } from "../hooks/room";
import { useNavigate } from "react-router-dom";
import { Card } from "../Components/Card";

export const Home = () => {
  const { socket, connected } = useSocket<
    ServerToClientEvents,
    ClientToServerEvents
  >(ENDPOINT);
  const { setRoom, room } = useRoom();

  const [isQueue, setIsQueue] = useState(false);

  const navigation = useNavigate();

  useEffect(() => {
    socket.on("joined", (room: Group) => {
      console.log(room);
      enterRoom(room);
    });

    socket.on("updateQueue", (room) => {
      console.log(room);
      setRoom(room);
    });

    socket.on("startedGame", (room) => {
      console.log(room)
      setRoom(room);
      navigation("/cardtable");
    });
  }, [socket]);

  const createGroup = async (name: string) => {
    const { data } = await axios.post(ENDPOINT + "/create");
    socket.emit("join", name, data.code);
  };

  const joinGroup = (name: string, code: string) => {
    socket.emit("join", name, code);
  };

  const enterRoom = (room: Group) => {
    setRoom(room);
    setIsQueue(true);
  };

  const leftGroup = () => {
    socket.emit("left", room.code);
    setRoom({} as Group);
    setIsQueue(false);
  };

  const startGame = () => {
    socket.emit("startGame", room);
  };



  return (
    <div className="bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 flex items-center justify-center">
      {isQueue ? (
        <Queue startGame={startGame} leftGroup={leftGroup} socketId={socket.id} room={room!} />
      ) : (
        <Join createGroup={createGroup} joinGroup={joinGroup} />
      )}
    </div>
  );
};
