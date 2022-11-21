export type Group = {
    code: string;
    players?: Player[];
    cards?: string[];
    lastCard?: string;
}

export type Player = {
    name: string;
    id: string;
    cards?: string[]; 
    isOwner: boolean;
}