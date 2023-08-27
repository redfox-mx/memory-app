
export type CardState = 'default' | 'fliped' | 'matched';

export interface Card {
  id: string;
  image: string;
  state: CardState
}
