export type Group = {
    code: string;
    players?: Player[];
    cards?: string[];
    lastCard?: string;
    playersList?: string[];
    playerTurn?: string;
    directionGame?: 'left' | 'right';
}

export type Player = {
    name: string;
    id: string;
    cards?: string[]; 
    isOwner: boolean;
}