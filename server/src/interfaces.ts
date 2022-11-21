export type Group = {
    code: string;
    players?: Player[];
}

export type Player = {
    name: string;
    id: string;
    cards?: string[]; 
    isOwner: boolean;
}