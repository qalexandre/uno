import { Card } from "../Components/Card"
import { Join } from "../Components/Join"


export const CardTable = () => {
    return (
        <div className='bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 flex items-center justify-center'>
           <Card color="green" size={1} type={"plus4"} number={2} />
           {/* <Join /> */}
        </div>
    )
}

