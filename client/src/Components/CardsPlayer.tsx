import clsx from "clsx";
import { Card } from "../Components/Card";

export const CardsPlayer = () => {
  const cards = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  

  return (

      <div className="w-[23.34rem] flex items-center justify-center">
        {cards.map((card, index) => (
          <div
          key={index}
            className={clsx(
                `z-[${index + 1000 }] relative mr-[-3.5rem] cursor-pointer hover:scale-110 hover:z-[3000] transition-all ease-in hover:ml-4 hover:mr-[0.1rem]`,
                {'mr-[-4rem]': cards.length > 10},
                {'mr-[-4.5rem]': cards.length > 15},
                {'mr-[-5rem]': cards.length > 20},
                )}
          >
            <Card color="red" size={2} type={"back"} number={3} />
          </div>
        ))}
      </div>

  );
};
