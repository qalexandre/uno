export type Group = {
    code: string;
    players?: Player[];
    cards?: string[];
}

export type Player = {
    name: string;
    id: string;
    isOwner: boolean;
    cards?: string[]; 
}