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

export function nextTurn(room: Group){
    const index = room.playersList?.findIndex(p => p == room.playerTurn)!;
    console.log('Pulando', index, room.playerTurn, room.directionGame)
    if(room.directionGame == 'right'){
        if((index + 1) == room.playersList?.length){
            room.playerTurn = room.playersList[0]
        }else {
            room.playerTurn = room.playersList![index + 1]
        }
    } else {
        if(index == 0){
            room.playerTurn = room.playersList![room.playersList!.length - 1]
        }else {
            room.playerTurn = room.playersList![index - 1]
        }
    }
    return room
}

export function verifyPower(card: string, room: Group){
    console.log('CARD',card)
    switch(card[0]){
        case 'B': 
        console.log('AQUI')
            room = nextTurn(room);
        break;
        case 'R':
            console.log('AQUI1 RETURN')
            room.directionGame = room.directionGame == 'right' ? 'left' : 'right';
        break;
        default: 
            null
    }

    return nextTurn(room)
}