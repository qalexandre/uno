import shape from "../assets/shape_card.svg";
import block from "../assets/block.png";
import blockBlack from "../assets/block_black.png";
import icon from "../assets/icon.svg";

type CardProps = {
  size: number;
  number?: number;
  color: Color;
  type: CardType;
};

type CardType = "block" | "reverse" | "plus2" | "plus4" | "normal" | "back";

type Color = "red" | "green" | "orange" | "gray";

export const Card = ({ size, number, color, type }: CardProps) => {
  const getColor = () => {
    switch (color) {
      case "gray":
        return "#515151";
      case "green":
        return "#21B9B9";
      case "orange":
        return "#EA6C25";
      case "red":
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
  switch (type) {
    case "normal":
      return (
        <div
          className={`flex relative w-[${getSize()?.width}] h-[${
            getSize()?.heigth
          }]  rounded font-card`}
          style={{ backgroundColor: getColor() }}
        >
          <p
            className={`absolute top-1 left-1 text-white ${
              getSize()?.number_2
            }`}
          >
            {number}
          </p>
          <p
            className={`absolute self-end right-1 text-white  ${
              getSize()?.number_2
            }`}
          >
            {number}
          </p>
          <div className="flex items-center w-full h-full justify-center">
            <img src={shape} className={`h-[${getSize()?.shape}]`} />
            <p className={`absolute  ${getSize()?.number_1}`}>{number}</p>
          </div>
        </div>
      );
    case "block":
      return (
        <div
          className={`flex relative w-[${getSize()?.width}] h-[${
            getSize()?.heigth
          }]  rounded font-card`}
          style={{ backgroundColor: getColor() }}
        >
          <img
            className={`absolute top-1 left-1 ${getSize()?.icon_2}`}
            src={block}
          />
          <img
            className={`absolute self-end bottom-1 right-1 ${
              getSize()?.icon_2
            }`}
            src={block}
          />
          <div className="flex items-center w-full h-full justify-center">
            <img src={shape} className={`h-[${getSize()?.shape}]`} />
            <img className={`absolute ${getSize()?.icon_1}`} src={blockBlack} />
          </div>
        </div>
      );
    case "plus2":
      return (
        <div
          className={`flex relative w-[${getSize()?.width}] h-[${
            getSize()?.heigth
          }]  rounded font-skranji`}
          style={{ backgroundColor: getColor() }}
        >
          <p
            className={`absolute top-1 left-1 text-white ${
              getSize()?.number_2
            }`}
          >
            +2
          </p>
          <p
            className={`absolute self-end right-1 text-white  ${
              getSize()?.number_2
            }`}
          >
            +2
          </p>
          <div className="flex items-center w-full h-full justify-center">
            <img src={shape} className={`h-[${getSize()?.shape}]`} />
            <p className={`absolute  ${getSize()?.number_1}`}>+2</p>
          </div>
        </div>
      );
    case "back":
      return (
        <div
          className={`flex relative w-[${getSize()?.width}] h-[${
            getSize()?.heigth
          }]  rounded font-skranji bg-black-800`}
        >
          <div className="flex items-center w-full h-full justify-center">
            <img src={icon} className={`h-[${getSize()?.shape}]`} />
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
