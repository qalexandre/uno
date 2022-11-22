import clsx from "clsx";
import { useEffect, useState } from "react";
import { Card } from "../Components/Card";
import { Player } from "../interfaces";

type CardProps = {
  isMy?: boolean;
  opponent?: boolean;
  isBuy?: boolean;
  cards?: string[];
  player?: Player;
  lastCard?: string;
};

export const CardsPlayer = ({
  isMy,
  opponent,
  isBuy,
  cards,
  lastCard,
  player
}: CardProps) => {
  const [change, setChange] = useState(false);
  const [margin, setMargin] = useState("");

  useEffect(() => {
    // setMargin(getMargin())
  }, []);

  const getMargin = (quant: number) => {
    if (opponent) {
      if (quant >= 10 && quant < 15) return "mr-[-4rem]";
      else if (quant >= 15 && quant < 20) return "mr-[-4.5rem]";
      else if (quant >= 20) return "mr-[-2.6rem]";
      else return "mr-[-3.5rem]";
    } else {
      if (quant >= 10 && quant < 15) return "mr-[-4rem]";
      else if (quant >= 15 && quant < 20) return "mr-[-4.5rem]";
      else if (quant >= 20) return "mr-[-4.8rem]";
      else return "mr-[-3.5rem]";
    }
  };

  if (isBuy) {
    const cardsBuy = [1, 2, 3, 4, 5, 6];

    return (
      <div className="flex items-center justify-start">
        {cardsBuy.map((card, index) => (
          <div key={index} className={`mr-[-4rem]`}>
            {index == 5 ? (
              <div
                className={`cursor-pointer  hover:scale-110 hover:z-[3000] transition-all ease-in hover:ml-4 hover:mr-[0.1rem]`}
              >
                <Card size={2} isBack />
              </div>
            ) : (
              <Card size={2} isBack />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx("w-[23.34rem] flex items-center justify-center", {
        "justify-start": opponent,
      })}
    >

      <div className="flex flex-col items-start">

        { opponent && 
          <div className="flex items-center justify-center bg-purple-400 rounded w-[11rem] px-2 py-[0.25rem]"> 
            <p className="text-black-900" > {player?.name} - {player?.cards?.length} </p>
          </div>
          }
        <div className="flex items-">
          {player?.cards?.map((card, index) => (
              <div key={index + card} className={clsx( `z-[${index + 1000}] relative ${getMargin(player?.cards?.length!)}`,
                  { "cursor-pointer hover:scale-110 hover:z-[3000] transition-all ease-in hover:ml-4 hover:mr-[0.1rem]": isMy} 
                )}
              >
                {isMy ? (
                  <Card
                    isBlock={lastCard![0] != card[0] && lastCard![1] != card[1]}
                    code={card}
                    size={isMy ? 1 : opponent ? 3 : 2}
                  />
                ) : (
                  <Card code={card} size={isMy ? 1 : opponent ? 3 : 2} />
                )}
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};
