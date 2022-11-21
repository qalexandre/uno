import icon from "../assets/icon.svg";
import { Group } from "../interfaces";

type QueueProps = {
  room: Group;
  socketId: string;
  leftGroup: () => void;
};

export const Queue = ({ room, socketId, leftGroup }: QueueProps) => {
  const owner = room.players?.find((p) => p.isOwner == true);
  return (
    <div className="relative flex flex-col items-center bg-black-900 w-w-login h-h-login">
      <img className="w-24 mt-4" src={icon} alt="" />
      <p className="text-white text-[1.5rem] mt-2">
        Esperando... ({room.players?.length}/8)
      </p>
      <div className="relative mt-9 ml-9 text-start self-start text-white w-[18rem]">
        {room.players?.map((p) => (
          <p key={p.id}>{p.name}</p>
        ))}
      </div>
      {owner?.id == socketId ? (
      <button disabled={room.players!.length < 2} className="disabled:grayscale bg-blue-700 w-40 h-16 rounded-xl text-xl text-white absolute bottom-20 font-inter font-bold">
        Iniciar
      </button>
      ) : null}

<button onClick={leftGroup} className=" text-xl text-red_card-100 absolute bottom-4 right-4 cursor-pointer">Sair</button>
        <p className="absolute bottom-3 text-white text-2xl">{room.code}</p>
    </div>
  );
};
