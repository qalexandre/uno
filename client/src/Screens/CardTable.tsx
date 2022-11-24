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
  Result,
  ServerToClientEvents,
} from "../interfaces";
import { useEffect, useState } from "react";
import { ColorModal } from "../Components/ColorModal";
import { FinishedModal } from "../Components/FinishedModal";

export const CardTable = () => {
  const [me, setMe] = useState(0);
  const [roomSelected, setRoomSelected] = useState({} as Group);

  const [showModalColor, setShowModalColor] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  const [isMyTurn, setIsMyTurn] = useState(false);
  const [canChoose, setCanChoose] = useState(false);
  const [chooser, setChooser] = useState({} as Player);

  const [finishedGame, setFinishedGame] = useState({} as Result);

  const [cardColor, setCardColor] = useState("");
  const [card, setCard] = useState("");

  const { socket, connected } = useSocket<
    ServerToClientEvents,
    ClientToServerEvents
  >(ENDPOINT);
  const { room, setRoom } = useRoom();

  useEffect(() => {
    socket.on("updateCards", (roomUpdated) => {
      setRoom(roomUpdated);
    });
    socket.on("skipedTurn", (roomUpdated) => {
      console.log(roomUpdated);
      setRoom(roomUpdated);
    });
    socket.on("boughtCard", (roomUpdated) => {
      setRoom(roomUpdated);
    });

    socket.on("selectedColor", (color) => {
      setCardColor(color);
    });

    socket.on("openedModalColor", (room, player, card) => {
      handleShowModalColor(room, player, card);
    });

    socket.on("closedModalColor", () => {
      setCardColor("");
      setShowModalColor(false);
    });

    socket.on("gameFinished", (result, room) => {
      setRoom(room);
      setFinishedGame(result);
    });
  }, [socket]);

  useEffect(() => {
    const me = room.players?.findIndex((p) => p.id == socket.id)!;
    setMe(me);
  }, [room]);

  function skipTurn() {
    socket.emit("skipTurn", room);
    setCanSkip(false);
  }

  function buyCard() {
    socket.emit("buyCard", room);
    setCanSkip(true);
  }

  function getPosition(number: number) {
    let index = me;
    console.log(number, index);
    for (let i = 0; i < number; i++) {
      if (index + 1 >= room.playersList!.length) {
        index = 0;
      } else {
        index++;
      }
    }
    return index;
  }

  function setNewColor(color: string) {
    socket.emit("selectColor", color, room);
    setCanChoose(false);
    setCardColor(color);
    setTimeout(() => {
      setShowModalColor(false);
      setCardColor("");
      socket.emit("closeModalColor", room);
      socket.emit("playCard", card, room, color);
    }, 2000);
  }

  function handleShowModalColor(room: Group, player: Player, card: string) {
    setShowModalColor(true);
    setChooser(player);
    if (socket.id == player.id) {
      setCanChoose(true);
      setIsMyTurn(true);
    } else setIsMyTurn(false);
    setCard(card);
  }

  const getColor = (code: string) => {
    switch (code![1]) {
      case "B":
        return " bg-gray_card-100";
      case "G":
        return " bg-green_card-100";
      case "O":
        return "bg-orange_card-100";
      case "R":
        return " bg-red_card-100";
    }
  };

  return (
    <div
      className={clsx(
        "bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 pt-[2.5rem] pb-[3rem] px-[8.6rem]"
      )}
    >
      {finishedGame?.winner?.name ? (
        <FinishedModal result={finishedGame} />
      ) : null}
      {showModalColor ? (
        <ColorModal
          myTurn={isMyTurn}
          canChoose={canChoose}
          card={card}
          colorSelected={cardColor}
          setColor={setNewColor}
          visible={showModalColor}
          player={chooser}
        />
      ) : null}
      {/* <Card color="green" size={1} type={"plus4"} number={2} /> */}
      <div className="absolute bottom-20 left-30">
        <CardsPlayer
          canBuy={!canSkip}
          player={room.players![me]}
          isMy
          buyCard={buyCard}
          isBuy
        />
      </div>
      <div>
        <button
          onClick={() => (canSkip ? skipTurn() : null)}
          disabled={room.players![me].name != room.playerTurn || !canSkip}
          className="bg-red-700 bottom-5 left-30 text-white w-[10rem] disabled:grayscale h-[2.5rem] absolute rounded"
        >
          Pular
        </button>
      </div>
      {room.players?.length == 2 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <CardsPlayer player={room.players[getPosition(1)]} opponent={true} />
          <div
            className={`w-[14rem] h-[14rem] ${getColor(
              room.lastCard!
            )} flex justify-center items-center rounded-full`}
          >
            <Card hasShadow code={room.lastCard} size={1} />
          </div>
          <CardsPlayer
            setCanSkip={setCanSkip}
            showModalColor={handleShowModalColor}
            lastCard={room.lastCard}
            player={room.players[me]}
            isMy={true}
          />
        </div>
      )}

      {room.players?.length == 3 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <div className="w-full flex items-center justify-between">
            <CardsPlayer
              player={room.players[getPosition(2)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(1)]}
              opponent={true}
            />
          </div>
          <Card code={room.lastCard} size={1} />
          <CardsPlayer
            setCanSkip={setCanSkip}
            showModalColor={handleShowModalColor}
            lastCard={room.lastCard}
            player={room.players[me]}
            isMy={true}
          />
        </div>
      )}

      {room.players?.length == 4 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex-1 w-full flex flex-col  mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(3)]}
              opponent={true}
            />
          </div>
          <div className="h-full flex flex-col items-center justify-between">
            <CardsPlayer
              player={room.players[getPosition(2)]}
              opponent={true}
            />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer
              setCanSkip={setCanSkip}
              showModalColor={handleShowModalColor}
              lastCard={room.lastCard}
              player={room.players[me]}
              isMy={true}
            />
          </div>
          <div className="flex-1 mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(1)]}
              opponent={true}
            />
          </div>
        </div>
      )}

      {room.players?.length == 5 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[9rem] mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(3)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(4)]}
              opponent={true}
            />
          </div>
          <div className="h-full flex flex-col items-center justify-between  pt-[7rem]">
            <Card code={room.lastCard} size={1} />
            <CardsPlayer
              setCanSkip={setCanSkip}
              showModalColor={handleShowModalColor}
              lastCard={room.lastCard}
              player={room.players[me]}
              isMy={true}
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-[9rem] mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(2)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(1)]}
              opponent={true}
            />
          </div>
        </div>
      )}

      {room.players?.length == 6 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[6rem] mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(5)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(4)]}
              opponent={true}
            />
          </div>
          <div className="h-full flex flex-col items-center justify-between  ">
            <CardsPlayer
              player={room.players[getPosition(3)]}
              opponent={true}
            />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer
              setCanSkip={setCanSkip}
              showModalColor={handleShowModalColor}
              lastCard={room.lastCard}
              player={room.players[getPosition(1)]}
              isMy={true}
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-[6rem] mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(2)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(1)]}
              opponent={true}
            />
          </div>
        </div>
      )}

      {room.players?.length == 7 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[3rem] mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(4)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(5)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(6)]}
              opponent={true}
            />
          </div>
          <div className="h-full flex flex-col items-center justify-between  pt-[7rem]">
            <Card code={room.lastCard} size={1} />
            <CardsPlayer
              setCanSkip={setCanSkip}
              showModalColor={handleShowModalColor}
              lastCard={room.lastCard}
              player={room.players[me]}
              isMy={true}
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-[3rem] mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(3)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(2)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(1)]}
              opponent={true}
            />
          </div>
        </div>
      )}

      {room.players?.length == 8 && (
        <div className="h-full flex items-center justify-between ">
          <div className="flex flex-col items-center justify-between gap-[2.7rem] mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(5)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(6)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(7)]}
              opponent={true}
            />
          </div>
          <div className="h-full flex flex-col items-center justify-between ">
            <CardsPlayer
              setCanSkip={setCanSkip}
              player={room.players[getPosition(4)]}
              opponent={true}
            />
            <Card code={room.lastCard} size={1} />
            <CardsPlayer
              showModalColor={handleShowModalColor}
              lastCard={room.lastCard}
              player={room.players[me]}
              isMy={true}
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-[2.7rem] mt-[-12rem]">
            <CardsPlayer
              player={room.players[getPosition(3)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(2)]}
              opponent={true}
            />
            <CardsPlayer
              player={room.players[getPosition(1)]}
              opponent={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};
