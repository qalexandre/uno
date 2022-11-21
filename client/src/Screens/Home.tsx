import { Join } from "../Components/Join";
import { Queue } from "../Components/Queue";
import { Group } from "../interfaces";

export type HomeProps = {
  createGroup: (name: string) => void;
  joinGroup: (name: string, code: string) => void;
  room?: Group;
  isQueue: boolean;
};

export const Home = ({ createGroup, joinGroup, isQueue, room }: HomeProps) => {
  return (
    <div className="bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 flex items-center justify-center">
      {isQueue ? (
        <Queue room={room!} />
      ) : (
        <Join createGroup={createGroup} joinGroup={joinGroup} />
      )}
    </div>
  );
};
