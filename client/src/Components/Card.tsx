import shape from "../assets/shape_card.svg";
import block from "../assets/block.png";
import blockBlack from "../assets/block_black.png";
import reverse from "../assets/reverse.png";
import reverseBlack from "../assets/reverse_black.png";
import icon from "../assets/icon.svg";
import changeColor from "../assets/changeColor.svg";
import plus4 from "../assets/plus4.svg";

import clsx from "clsx";

type CardProps = {
  size: number;
  code?: string;
  isBack?: boolean;
  isBlock?: boolean;
  playCard?: (card: string) => void;
};

type CardType = "block" | "reverse" | "plus2" | "plus4" | "normal" | "back" | "changeColor";

type Color = "red" | "green" | "orange" | "gray";

export const Card = ({ size, code, isBack, isBlock, playCard }: CardProps) => {


  const largeCard = size === 1
  const smallCard = size === 2
  const opponentCard = size === 3
  const getColor = () => {
    switch (code![1]) {
      case "B":
        return "#515151";
      case "G":
        return "#21B9B9";
      case "O":
        return "#EA6C25";
      case "R":
        return "#F13556";
    }
  };

  const getSize = () => {
    switch (size) {
      case 1:
        return {
          width: "6.25rem",
          heigth: "9.43rem",
          shape: "6.87rem",
          number_1: "text-4xl",
          number_2: "text-base",
          icon_1: "w-9",
          icon_2: "w-4",
        };
      case 2:
        return {
          width: "5rem",
          heigth: "7.58rem",
          shape: "5.6rem",
          number_1: "text-3xl",
          number_2: "text-xs",
          icon_1: "w-6",
          icon_2: "w-3",
        };
    }
  };
  if(opponentCard || isBack){
    return (
      <div
      className={clsx(`flex relative rounded font-skranji bg-black-900`,
        { 'w-w-largeCard h-h-largeCard': largeCard },
        { 'w-w-smallCard h-h-smallCard': smallCard },
        { 'w-w-opponentCard h-h-opponentCard': opponentCard },
      )}
    >
      <div className="flex items-center w-full h-full justify-center">
        <img src={icon} className={`h-[${getSize()?.shape}]`} />
      </div>
    </div>
    )
  }
  switch (code![0]) {
    case "B":
      return (
        <div 
        onClick={() => !isBlock && playCard ? playCard(code!) : null}
          className={clsx(`flex relative rounded font-card`,
            { 'w-w-largeCard h-h-largeCard': largeCard },
            { 'w-w-smallCard h-h-smallCard': smallCard },
            { 'brightness-50' : isBlock}
          )}
          style={{ backgroundColor: getColor() }}
        >
          <img
            className={`absolute top-1 left-1 ${getSize()?.icon_2}`}
            src={block}
          />
          <img
            className={`absolute self-end bottom-1 right-1 ${getSize()?.icon_2
              }`}
            src={block}
          />
          <div className="flex items-center w-full h-full justify-center">
            <img src={shape} className={`h-[${getSize()?.shape}]`} />
            <img className={`absolute ${getSize()?.icon_1}`} src={blockBlack} />
          </div>
        </div>
      );
    case "D":
      return (
        <div
        onClick={() => !isBlock && playCard ? playCard(code!) : null}
          className={clsx(`flex relative rounded font-skranji`,
            { 'w-w-largeCard h-h-largeCard': largeCard },
            { 'w-w-smallCard h-h-smallCard': smallCard },
            { 'brightness-50' : isBlock}
          )}
          style={{ backgroundColor: getColor() }}
        >
          <p className={`absolute top-1 left-1 text-white ${getSize()?.number_2}`}>
            +2
          </p>
          <p className={`absolute self-end right-1 text-white  ${getSize()?.number_2}`}>
            +2
          </p>
          <div className="flex items-center w-full h-full justify-center">
            <img src={shape} className={`h-[${getSize()?.shape}]`} />
            <p className={`absolute  ${getSize()?.number_1}`}>+2</p>
          </div>
        </div>
      );
    case "R":
      return (
        <div
        onClick={() => !isBlock && playCard ? playCard(code!) : null}
        className={clsx(`flex relative rounded font-card `,
          { 'w-w-largeCard h-h-largeCard': largeCard },
          { 'w-w-smallCard h-h-smallCard': smallCard },
          { 'brightness-50' : isBlock}
        )}
        style={{ backgroundColor: getColor() }}
      >
        <img
          className={`absolute top-1 left-1 ${getSize()?.icon_2}`}
          src={reverse}
        />
        <img
          className={`absolute self-end bottom-1 right-1 ${getSize()?.icon_2
            }`}
          src={reverse}
        />
        <div className="flex items-center w-full h-full justify-center">
          <img src={shape} className={`h-[${getSize()?.shape}]`} />
          <img className={`absolute ${getSize()?.icon_1}`} src={reverseBlack} />
        </div>
      </div>
      );
    case "C":
      return (
        <div 
        onClick={() => !isBlock && playCard ? playCard(code!) : null}
        className={clsx(`flex flex-col items-center justify-between relative  rounded font-skranji bg-gray-900`,
          { 'w-w-largeCard h-h-largeCard': largeCard },
          { 'w-w-smallCard h-h-smallCard': smallCard },
          { 'brightness-50' : isBlock}
        )}
        >
          <div className={clsx('flex items-center justify-between w-full', { 'px-2 pt-2': largeCard }, { 'px-[0.46rem] pt-[0.46rem]': smallCard })}>
            <div className={clsx('bg-gray_card-100', { 'h-3 w-2': largeCard }, { 'h-[0.62rem] w-[0.45rem]': smallCard })} ></div>
            <div className={clsx('bg-orange_card-100', { 'h-3 w-2': largeCard }, { 'h-[0.62rem] w-[0.45rem]': smallCard })}></div>
          </div>

          <div className="flex items-center w-full h-full justify-center">
            <img src={changeColor} className={clsx({ 'w-[2,87rem] h-[3.5rem]': largeCard }, { 'w-[2.31rem] h-[2.68rem]': smallCard })} />
          </div>

          <div className={clsx('flex items-center justify-between w-full', { 'px-2 pb-2': largeCard }, { 'px-[0.46rem] pb-[0.46rem]': smallCard })}>
            <div className={clsx('bg-green_card-100', { 'h-3 w-2': largeCard }, { 'h-[0.62rem] w-[0.45rem]': smallCard })} ></div>
            <div className={clsx('bg-red_card-100', { 'h-3 w-2': largeCard }, { 'h-[0.62rem] w-[0.45rem]': smallCard })}></div>
          </div>
        </div>
      );
    case "F":
      return (
        <div
        onClick={() => !isBlock && playCard ? playCard(code!) : null}
        className={clsx(`flex relative  rounded font-skranji bg-black-900`,
          { 'w-w-largeCard h-h-largeCard': largeCard },
          { 'w-w-smallCard h-h-smallCard': smallCard },
          { 'brightness-50' : isBlock}
        )}
        >
            <img src={plus4} className="w-full h-full" />
        </div>
      );
    default:
      return (
        <div
        onClick={() => !isBlock && playCard ? playCard(code!) : null}
          className={clsx(`flex relative rounded font-card `,
            { 'w-w-largeCard h-h-largeCard': largeCard },
            { 'w-w-smallCard h-h-smallCard': smallCard },
            { 'brightness-50' : isBlock}

          )}
          style={{ backgroundColor: getColor() }}
        >
          <p
            className={`absolute top-1 left-1 text-white ${getSize()?.number_2
              }`}>
            {code![0]}
          </p>
          <p
            className={`absolute self-end right-1 text-white  ${getSize()?.number_2
              }`}
          >
            {code![0]}
          </p>
          <div className="flex items-center w-full h-full justify-center">
            <img src={shape} className={clsx(
              { 'h-[6.87rem]': largeCard },
              { 'h-[5.6rem]': smallCard },
            )} />
            <p className={`absolute text-black-800 ${getSize()?.number_1}`}>{code![0]}</p>
          </div>
        </div>
      );
  }
};
