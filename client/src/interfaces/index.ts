export type Group = {
    code: string;
    players?: Player[];
}

export type Player = {
    name: string;
    id: string;
    isOwner: boolean;
    cards?: string[]; 
}