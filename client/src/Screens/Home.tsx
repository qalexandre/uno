import { Join } from "../Components/Join";
import { Queue } from "../Components/Queue";
import { Group } from "../interfaces";

export type HomeProps = {
  createGroup: (name: string) => void;
  joinGroup: (name: string, code: string) => void;
  room?: Group;
  isQueue: boolean;
  socketId: string;
  leftGroup: () => void;
  startGame: () => void;
};

export const Home = ({ createGroup, joinGroup, isQueue, room, socketId, leftGroup, startGame }: HomeProps) => {
  return (
    <div className="bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 flex items-center justify-center">
      {isQueue ? (
        <Queue startGame={startGame} leftGroup={leftGroup} socketId={socketId} room={room!} />
      ) : (
        <Join createGroup={createGroup} joinGroup={joinGroup} />
      )}
    </div>
  );
};
