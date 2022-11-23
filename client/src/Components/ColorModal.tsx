type ColorModalProps = {
  setColor: (color: string) => void;
  visible: boolean;
};

export const ColorModal = ({ setColor, visible }: ColorModalProps) => {
  return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-8 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">
              <div className="bg-gray-50 w-full flex items-center justify-center px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setColor("R")}
                  className="bg-red_card-100 hover:brightness-50  hover:ring-2 hover:ring-bg-red_card-100 hover:ring-offset-2 sm:ml-3 w-[4rem] h-[4rem] rounded-full border border-transparent shadow-sm focus:outline-none "
                ></button>
                <button
                  type="button"
                  onClick={() => setColor("G")}
                  className="bg-green_card-100 hover:brightness-50 hover:ring-2 hover:ring-green_card-100 hover:ring-offset-2 sm:ml-3 w-[4rem] h-[4rem] rounded-full border border-transparent shadow-sm focus:outline-none "
                ></button>
                <button
                  type="button"
                  onClick={() => setColor("O")}
                  className="bg-orange_card-100 hover:brightness-50 hover:ring-2 hover:ring-orange_card-100 hover:ring-offset-2 sm:ml-3 w-[4rem] h-[4rem] rounded-full border border-transparent shadow-sm focus:outline-none "
                ></button>
                <button
                  type="button"
                  onClick={() => setColor("B")}
                  className="bg-gray_card-100 hover:brightness-50 hover:ring-2 hover:ring-gray_card-100 hover:ring-offset-2 sm:ml-3 w-[4rem] h-[4rem] rounded-full border border-transparent shadow-sm focus:outline-none "
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};
