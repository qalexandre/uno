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

export type Result = {
  winner: Player;
  losers: Loser[]
}

type Loser = {
  name: string;
  leftCards: number;
}

export interface ServerToClientEvents {
    joined: (room: Group) => void;
    updateQueue: (room: Group) => void;
    error: (message: string) => void;
    startedGame: (room: Group) => void;
    updateCards: (room: Group) => void
    skipedTurn: (room: Group) => void
    boughtCard: (room: Group) => void
    selectedColor: (color: string) => void;
    openedModalColor: (room: Group, player: Player, card: string) => void;
    closedModalColor: () => void
    gameFinished: (result: Result, room: Group) => void;
  }
  
  export interface ClientToServerEvents {
    join: (name: string, code: string) => void;
    left: (code: string) => void;
    startGame: (room: Group) => void;
    playCard: (card: string, room: Group, color: string) => void;
    skipTurn: (room: Group) => void;
    buyCard: (room: Group) => void;
    selectColor: (color: string, room: Group) => void;
    openModalColor: (room: Group, player: Player, card: string) => void;
    closeModalColor: (room: Group) => void;
  }