import clsx from "clsx";
import { ENDPOINT } from "../App";
import { Card } from "../Components/Card";
import { CardsPlayer } from "../Components/CardsPlayer";
import { useRoom } from "../hooks/room";
import { useSocket} from 'socket.io-react-hook'
import { ClientToServerEvents, Group, Player, ServerToClientEvents } from "../interfaces";
import { useEffect, useState } from "react";

export const CardTable = () => {

  const [me, setMe] = useState({} as Player)
  const [roomSelected, setRoomSelected] = useState({} as Group)

  const {socket, connected} = useSocket<ServerToClientEvents, ClientToServerEvents>(ENDPOINT)
  const {room, setRoom} = useRoom()

  
  useEffect(() => {
    const me = room.players?.find(p => p.id == socket.id)!;
    setMe(me)
    room.players = room.players?.filter(p => p !== me)
    room.players?.unshift(me)
    setRoom(room)
    console.log(room)
  }, [roomSelected])

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
      {room.players?.length == 2 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <CardsPlayer cards={room.players[1]?.cards} />
            <Card code={room.lastCard} size={1} />
          <CardsPlayer lastCard={room.lastCard} cards={me?.cards} isMy={true} />

        </div>
      )}

      {room.players?.length == 3 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <div className="w-full flex items-center justify-between">
            <CardsPlayer cards={room.players[1]?.cards} opponent={true} />
            <CardsPlayer cards={room.players[2]?.cards} opponent={true} />
          </div>
          <Card code={room.lastCard} size={1} />
          <CardsPlayer  cards={me?.cards} isMy={true} />
        </div>
      )}

      {room.players?.length == 4 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex-1 w-full flex flex-col  mt-[-12rem]">
            {/* <div className="flex items-center justify-center bg-purple-400 rounded w-[11rem] px-2 py-[0.25rem]"> 
                    <p className="text-black-900" > Jogador - 48 </p>
                </div> */}
            <CardsPlayer opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between">
            <CardsPlayer opponent={true} />
            <Card code="RG" size={1} />
            <CardsPlayer isMy={true} />
          </div>
          <div className="flex-1 mt-[-12rem]">
            <CardsPlayer opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 5 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[9rem] mt-[-12rem]">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  pt-[7rem]">
            <Card code="RG" size={1} />
            <CardsPlayer isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[9rem] mt-[-12rem]">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 6 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[6rem] mt-[-12rem]">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  ">
            <CardsPlayer opponent={true} />
            <Card code="RG" size={1} />
            <CardsPlayer isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[6rem] mt-[-12rem]">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 7 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[3rem] mt-[-12rem]">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  pt-[7rem]">
            <Card code="RG" size={1} />
            <CardsPlayer isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[3rem] mt-[-12rem]">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
        </div>
      )}
      
      {room.players?.length == 8 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[2.7rem] mt-[-12rem]">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between ">
            <CardsPlayer opponent={true} />
            <Card code="RG" size={1} />
            <CardsPlayer isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[2.7rem] mt-[-12rem]">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
        </div>
      )}
    </div>
  );
};
