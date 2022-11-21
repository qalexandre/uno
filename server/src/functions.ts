import { getCards } from "./data";
import { Group, Player } from "./interfaces";

export function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export function generateCards(room: Group){
    const cards = [
        '0O','1O', '2O', '3O', '4O', '5O', '6O', '7O', '8O', '9O', 'BO', 'RO', 'DO',
        '0O','1O', '2O', '3O', '4O', '5O', '6O', '7O', '8O', '9O', 'BO', 'RO', 'DO',
        '0G','1G', '2G', '3G', '4G', '5G', '6G', '7G', '8G', '9G', 'BG', 'RG', 'DG',
        '0G','1G', '2G', '3G', '4G', '5G', '6G', '7G', '8G', '9G', 'BG', 'RG', 'DG',
        '0R','1R', '2R', '3R', '4R', '5R', '6R', '7R', '8R', '9R', 'BR', 'RR', 'DR',
        '0R','1R', '2R', '3R', '4R', '5R', '6R', '7R', '8R', '9R', 'BR', 'RR', 'DR',
        '0B','1B', '2B', '3B', '4B', '5B', '6B', '7B', '8B', '9B', 'BB', 'RB', 'DB',
        '0B','1B', '2B', '3B', '4B', '5B', '6B', '7B', '8B', '9B', 'BB', 'RB', 'DB',
        'FE', 'CE',
        'FE', 'CE',
        'FE', 'CE',
        'FE', 'CE',
    ]
    room.players?.map((player, index) => {

        let cardsSelected: string[] = []
        for ( var i = 0; i < 7; i++ ) {
            const index = (Math.floor(Math.random() * cards.length))
            const card = cards[index];
            cards.splice(index, 1)
            cardsSelected.push(card)
         }
         room.players![index].cards = cardsSelected;
         const last = (Math.floor(Math.random() * cards.length))
            room.lastCard = cards[last]
            cards.splice(last, 1)
         })
         room.cards = cards;
         return room;
    
}