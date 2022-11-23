export type Group = {
    code: string;
    players?: Player[];
    cards?: string[];
    lastCard?: string;
    playersList?: string[],
    directionGame?: 'left' | "right",
    playerTurn?: string, 
}

export type Player = {
    name: string;
    id: string;
    isOwner: boolean;
    cards?: string[]; 
}

export interface ServerToClientEvents {
    joined: (room: Group) => void;
    updateQueue: (room: Group) => void;
    error: (message: string) => void;
    startedGame: (room: Group) => void;
    updateCards: (room: Group) => void
    skipedTurn: (room: Group) => void
  }
  
  export interface ClientToServerEvents {
    join: (name: string, code: string) => void;
    left: (code: string) => void;
    startGame: (room: Group) => void;
    playCard: (card: string, room: Group, color: string) => void;
    skipTurn: (room: Group) => void;
  }