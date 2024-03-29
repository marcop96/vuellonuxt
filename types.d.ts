export interface Workspace {
  id: number;
  name: string;
  columns: Column[];
}

export interface Card {
  id: number;
  name: string;
}

export interface Column {
  id: number;
  name: string;
  cards: Card[];
}
