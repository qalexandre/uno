import clsx from "clsx";
import { Card } from "../Components/Card";
import { CardsPlayer } from "../Components/CardsPlayer";

export const CardTable = () => {
  const players = ["", "", "", ""];

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
      {players.length == 2 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <CardsPlayer opponent={true} />
          <Card code="RG" size={1} />
          <CardsPlayer isMy={true} />
        </div>
      )}

      {players.length == 3 && (
        <div className="h-full flex flex-col items-center justify-between ">
          <div className="w-full flex items-center justify-between">
            <CardsPlayer opponent={true} />
            <CardsPlayer opponent={true} />
          </div>
          <Card code="RG" size={1} />
          <CardsPlayer isMy={true} />
        </div>
      )}
      
      {players.length == 4 && (
        <div className="h-full flex items-center justify-between ">
            <div className="flex-1 w-full flex flex-col  mt-[-12rem]">
                <div className="flex items-center justify-center bg-purple-400 rounded w-[11rem] px-2 py-[0.25rem]"> 
                    <p className="text-black-900" > Jogador - 48 </p>
                </div>
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

      {players.length == 5 && (
        <div className="h-full flex items-center justify-between ">
            <div className="flex-1 mt-[-12rem]">
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
    </div>
  );
};
