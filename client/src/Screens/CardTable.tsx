import clsx from "clsx";
import { ENDPOINT } from "../App";
import { Card } from "../Components/Card";
import { CardsPlayer } from "../Components/CardsPlayer";
import { useRoom } from "../hooks/room";
import { useSocket } from "socket.io-react-hook";
import {
  ClientToServerEvents,
  Group,
  Player,
  ServerToClientEvents,
} from "../interfaces";
import { useEffect, useState } from "react";

export const CardTable = () => {
  const [me, setMe] = useState({} as Player);
  const [roomSelected, setRoomSelected] = useState({} as Group);

  const { socket, connected } = useSocket<
    ServerToClientEvents,
    ClientToServerEvents
  >(ENDPOINT);
  const { room, setRoom } = useRoom();

  useEffect(() => {
    socket.on("updateCards", (roomUpdated) => {
      console.log(roomUpdated);
      setRoom(roomUpdated);
    });
    socket.on("skipedTurn", (roomUpdated) => {
      console.log(roomUpdated);
      setRoom(roomUpdated);
    });
  }, [socket]);

  useEffect(() => {
    const me = room.players?.find((p) => p.id == socket.id)!;
    setMe(me);
    room.players = room.players?.filter((p) => p !== me);
    room.players?.unshift(me);
    setRoom(room);
    console.log(room);
  }, [room]);

  function skipTurn() {
    socket.emit("skipTurn", room);
  }

  return (
    <div
      className={clsx(
        "bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 pt-[2.5rem] pb-[3rem] px-[8.6rem]"
        // { '' : players.length == 2   }
      )}
    >
      {/* <Card color="green" size={1} type={"plus4"} number={2} /> */}
      <div className="absolute bottom-20 left-30">
        <CardsPlayer isBuy />
      </div>
      <div>
        <button onClick={skipTurn} disabled={me.name != room.playerTurn} className="bg-red-700 bottom-5 left-30 text-white w-[10rem] disabled:grayscale h-[2.5rem] absolute rounded">
          Pular
        </button>
      </div>
      {room.players?.length == 2 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <CardsPlayer player={room.players[1]} opponent={true} />
          <Card code={room.lastCard} size={1} />
          <CardsPlayer lastCard={room.lastCard} player={me} isMy={true} />
        </div>
      )}

      {room.players?.length == 3 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <div className="w-full flex items-center justify-between">
            <CardsPlayer player={room.players[1]} opponent={true} />
            <CardsPlayer player={room.players[2]} opponent={true} />
          </div>
          <Card code={room.lastCard} size={1} />
          <CardsPlayer lastCard={room.lastCard} player={me} isMy={true} />
        </div>
      )}

      {room.players?.length == 4 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex-1 w-full flex flex-col  mt-[-12rem]">
            {/* <div className="flex items-center justify-center bg-purple-400 rounded w-[11rem] px-2 py-[0.25rem]"> 
                    <p className="text-black-900" > Jogador - 48 </p>
                </div> */}
            <CardsPlayer player={room.players[2]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between">
            <CardsPlayer player={room.players[1]} opponent={true} />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer lastCard={room.lastCard} player={me} isMy={true} />
          </div>
          <div className="flex-1 mt-[-12rem]">
            <CardsPlayer player={room.players[3]} opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 5 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[9rem] mt-[-12rem]">
            <CardsPlayer player={room.players[1]} opponent={true} />
            <CardsPlayer player={room.players[3]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  pt-[7rem]">
            <Card code={room.lastCard} size={1} />
            <CardsPlayer lastCard={room.lastCard} player={me} isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[9rem] mt-[-12rem]">
            <CardsPlayer player={room.players[2]} opponent={true} />
            <CardsPlayer player={room.players[4]} opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 6 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[6rem] mt-[-12rem]">
            <CardsPlayer player={room.players[2]} opponent={true} />
            <CardsPlayer player={room.players[4]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  ">
            <CardsPlayer player={room.players[1]} opponent={true} />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer lastCard={room.lastCard} player={me} isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[6rem] mt-[-12rem]">
            <CardsPlayer player={room.players[4]} opponent={true} />
            <CardsPlayer player={room.players[5]} opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 7 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[3rem] mt-[-12rem]">
            <CardsPlayer player={room.players[1]} opponent={true} />
            <CardsPlayer player={room.players[3]} opponent={true} />
            <CardsPlayer player={room.players[5]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  pt-[7rem]">
            <Card code={room.lastCard} size={1} />
            <CardsPlayer lastCard={room.lastCard} player={me} isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[3rem] mt-[-12rem]">
            <CardsPlayer player={room.players[2]} opponent={true} />
            <CardsPlayer player={room.players[4]} opponent={true} />
            <CardsPlayer player={room.players[6]} opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 8 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[2.7rem] mt-[-12rem]">
            <CardsPlayer player={room.players[2]} opponent={true} />
            <CardsPlayer player={room.players[4]} opponent={true} />
            <CardsPlayer player={room.players[6]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between ">
            <CardsPlayer player={room.players[1]} opponent={true} />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer lastCard={room.lastCard} player={me} isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[2.7rem] mt-[-12rem]">
            <CardsPlayer player={room.players[3]} opponent={true} />
            <CardsPlayer player={room.players[5]} opponent={true} />
            <CardsPlayer player={room.players[7]} opponent={true} />
          </div>
        </div>
      )}
    </div>
  );
};
