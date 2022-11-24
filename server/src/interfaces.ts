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

export type Result = {
    winner: Player;
    losers: Loser[]
}

export type Loser = {
    name: string;
    leftCards: number;
}