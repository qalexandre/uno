import clsx from "clsx";
import { Card } from "./Card";

type ColorModalProps = {
  visible: boolean;
  myTurn: boolean;
  card: string;
  colorSelected: string;
  canChoose?: boolean;
};

export const Teste = ({
  card,
  colorSelected,
  myTurn,
  visible,
  canChoose
}: ColorModalProps) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-8 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 ">
            <div className="bg-gray-800 w-full flex  items-center justify-center px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6">
              <div className="flex flex-col gap-10 p-10">
                {myTurn ? (
                  <div className="items-center justify-center flex flex-col">
                    <p className="text-white mb-3">Você⠀jogou</p>
                    <Card size={4} code={card} />
                    <p className="text-white mt-3">Escolha uma cor</p>
                  </div>
                ) : (
                  <div className="items-center justify-center flex flex-col">
                    <p className="text-white mb-3">Player⠀jogou</p>
                    <Card size={4} code={card} />
                    <p className="text-white mt-3">Escolhendo...</p>
                  </div>
                )}

                <div className="rotate-45">
                  <div className="w-[201px]">
                    <div
                      className={clsx(
                        "brightness-[0.6] w-[100px] h-[100px]  transition-all ease-in bg-red_card-100 block relative border-none rounded-tl-[100%] float-left",
                        {
                          "hover:brightness-100 hover:scale-110 hover:z-10 cursor-pointer hover:-translate-y-2 hover:-translate-x-2":
                            myTurn && canChoose,
                        },
                        {'scale-110 -translate-y-2 -translate-x-2 brightness-100': colorSelected == 'R'}
                      )}
                    ></div>
                    <div
                      className={clsx(
                        "brightness-[0.6] w-[100px] h-[100px]  transition-all ease-in bg-gray_card-100 block relative border-none rounded-tr-[100%] float-right",
                        {
                          "hover:brightness-100 hover:scale-110 hover:z-10 cursor-pointer hover:-translate-y-2 hover:translate-x-2":
                            myTurn && canChoose,
                        },
                        {'scale-110 -translate-y-2 translate-x-2 brightness-100': colorSelected == 'B'}
                      )}
                    ></div>
                  </div>
                  <div className="w-[201px]">
                    <div
                      className={clsx(
                        "brightness-[0.6] w-[100px] h-[100px]  transition-all ease-in bg-green_card-100 block relative border-none rounded-bl-[100%] float-left",
                        {
                          "hover:brightness-100 hover:scale-110 hover:z-10 cursor-pointer hover:translate-y-2 hover:-translate-x-2":
                            myTurn && canChoose,
                        },
                        {'scale-110 translate-y-2 -translate-x-2 brightness-100': colorSelected == 'G'}
                      )}
                    ></div>
                    <div
                      className={clsx(
                        "brightness-[0.6] w-[100px] h-[100px]  transition-all ease-in bg-orange_card-100 block relative border-none rounded-br-[100%] float-right",
                        {
                          "hover:brightness-100 hover:scale-110 hover:z-10 cursor-pointer hover:translate-y-2 hover:translate-x-2":
                            myTurn && canChoose,
                        },
                        {'scale-110 translate-y-2 translate-x-2 brightness-100': colorSelected == 'O'}
                      )}
                    ></div>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col justify-center items-center">
                  <div className=" mb-[-3rem] w-[10px] border-t-[110px] border-l-transparent border-r-transparent border-l-[100px] border-r-[100px] rounded-[50%]"></div>
                  <div className="flex">
                  <div className=" left-[-2.5rem] border-t-[100px] border-l-transparent border-r-transparent border-l-[100px] border-r-[100px] rounded-[50%] -rotate-90"></div>
                  <div className=" ml-[-5.5rem] border-t-[100px] border-l-transparent border-r-transparent border-l-[100px] border-r-[100px] rounded-[50%] rotate-90"></div>
                  </div>
                 
                  <div className="mt-[-3rem] w-[80px] border-t-[110px] border-l-transparent border-r-transparent border-l-[100px] border-r-[100px] rounded-[50%] rotate-180 "></div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
