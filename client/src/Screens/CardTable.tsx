import clsx from "clsx"
import { Card } from "../Components/Card"
import { CardsPlayer } from "../Components/CardsPlayer"

export const CardTable = () => {

    const players = ['', '', ]
    
    return (
        <div className={clsx('bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 grid grid-cols-3 ',
        { '' : players.length == 2   }
        )}>
           {/* <Card color="green" size={1} type={"plus4"} number={2} /> */}
           {
            players.length == 2 && 
            <div>
                <CardsPlayer />
                    <img />
                <CardsPlayer />
            </div>
           }
            <div>
            </div>
            <div>
            <CardsPlayer />
            </div>
            <div>
            <CardsPlayer />
            <CardsPlayer />
            </div>
        </div>
    )
}

