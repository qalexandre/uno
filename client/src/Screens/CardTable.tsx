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
import { ColorModal } from "../Components/ColorModal";

export const CardTable = () => {
  const [me, setMe] = useState(0);
  const [roomSelected, setRoomSelected] = useState({} as Group);

  const [showModalColor, setShowModalColor] = useState(false);

  const [cardColor, setCardColor] = useState('');

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
    const me = room.players?.findIndex((p) => p.id == socket.id)!;
    setMe(me);

  }, [room]);

  function skipTurn() {
    socket.emit("skipTurn", room);
  }

  function getPosition(number: number){
    let index = me;
    console.log(number, index)
    for(let i = 0; i < number; i ++){
      if (index + 1 >= room.playersList!.length) {
        index = 0;
      } else {
        index++;
      }
    }
    return index
  }

  function setNewColor(color: string){
    setShowModalColor(false);
    socket.emit("playCard", cardColor, room, color)
  }

  function handleShowModalColor(card:string){
    console.log('CARD', card)
    setShowModalColor(true);
    setCardColor(card)
  }

  return (
    <div
      className={clsx(
        "bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 pt-[2.5rem] pb-[3rem] px-[8.6rem]"
      )}
    >
      { showModalColor ?  <ColorModal setColor={setNewColor} visible={showModalColor} /> : null}
      {/* <Card color="green" size={1} type={"plus4"} number={2} /> */}
      <div className="absolute bottom-20 left-30">
        <CardsPlayer isBuy />
      </div>
      <div>
        <button onClick={skipTurn} disabled={room.players![me].name != room.playerTurn} className="bg-red-700 bottom-5 left-30 text-white w-[10rem] disabled:grayscale h-[2.5rem] absolute rounded">
          Pular
        </button>
      </div>
      {room.players?.length == 2 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <CardsPlayer player={room.players[getPosition(1)]} opponent={true} />
          <Card code={room.lastCard} size={1} />
          <CardsPlayer showModalColor={handleShowModalColor} lastCard={room.lastCard} player={room.players[me]} isMy={true} />
        </div>
      )}

      {room.players?.length == 3 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <div className="w-full flex items-center justify-between">
            <CardsPlayer player={room.players[getPosition(2)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(1)]} opponent={true} />
          </div>
          <Card code={room.lastCard} size={1} />
          <CardsPlayer showModalColor={handleShowModalColor} lastCard={room.lastCard} player={room.players[me]} isMy={true} />
        </div>
      )}

      {room.players?.length == 4 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex-1 w-full flex flex-col  mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(3)]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between">
            <CardsPlayer player={room.players[getPosition(2)]} opponent={true} />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer showModalColor={handleShowModalColor} lastCard={room.lastCard} player={room.players[me]} isMy={true} />
          </div>
          <div className="flex-1 mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(1)]} opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 5 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[9rem] mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(3)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(4)]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  pt-[7rem]">
            <Card code={room.lastCard} size={1} />
            <CardsPlayer showModalColor={handleShowModalColor} lastCard={room.lastCard} player={room.players[me]} isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[9rem] mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(2)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(1)]} opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 6 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[6rem] mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(5)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(4)]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  ">
            <CardsPlayer player={room.players[getPosition(3)]} opponent={true} />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer showModalColor={handleShowModalColor} lastCard={room.lastCard} player={room.players[getPosition(1)]} isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[6rem] mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(2)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(1)]} opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 7 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[3rem] mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(4)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(5)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(6)]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between  pt-[7rem]">
            <Card code={room.lastCard} size={1} />
            <CardsPlayer showModalColor={handleShowModalColor} lastCard={room.lastCard} player={room.players[me]} isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[3rem] mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(3)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(2)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(1)]} opponent={true} />
          </div>
        </div>
      )}

      {room.players?.length == 8 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[2.7rem] mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(5)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(6)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(7)]} opponent={true} />
          </div>
          <div className="h-full flex flex-col items-center justify-between ">
            <CardsPlayer player={room.players[getPosition(4)]} opponent={true} />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer showModalColor={handleShowModalColor} lastCard={room.lastCard} player={room.players[me]} isMy={true} />
          </div>
          <div className="flex flex-col items-center justify-between gap-[2.7rem] mt-[-12rem]">
            <CardsPlayer player={room.players[getPosition(3)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(2)]} opponent={true} />
            <CardsPlayer player={room.players[getPosition(1)]} opponent={true} />
          </div>
        </div>
      )}
    </div>
  );
};
