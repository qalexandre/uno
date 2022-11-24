import crownImg from "../assets/crown.png";
import clownImg from "../assets/clown.png";
import cardsImg from "../assets/card-games.png";
import { Result } from "../interfaces";

type FinishProps = {
  result: Result;
};

export const FinishedModal = ({ result }: FinishProps) => {

  function goHome(){
    window.location.href = '/';
    
  }
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
            <div className="bg-gray-800 w-full items-center justify-center px-4 py-5 sm:px-6">
              <div className="flex items-center justify-center gap-4 border-b-2 border-gray-600">
                <img src={crownImg} width={40} alt="crown" />
                <p className="text-white text-xl">
                  {result.winner.name.toUpperCase()} GANHOU!!!
                </p>
              </div>
              <br />
              {result.losers.map((loser) => (
                <div className="flex items-center mb-4 w-full">
                  <img src={clownImg} width={30} alt="crown" />
                  <p className="text-white text-md ml-4 mr-8">
                    {loser.name.toLowerCase()}
                  </p>
                  <img src={cardsImg} width={20} alt="crown" />
                  <p className="text-white ml-4 text-md">{loser.leftCards} {loser.leftCards == 1 ? 'carta' : 'cartas'}</p>
                </div>
              ))}
              <div>
                <button onClick={goHome} className="text-white">Voltar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
