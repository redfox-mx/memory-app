
export const DEFAULT_CARD_STATE = 'default';
export const SELECTED_CARD_STATE = 'selected';
export const MATCHED_CARD_STATE = 'matched';

export type CardState =
  typeof DEFAULT_CARD_STATE |
  typeof SELECTED_CARD_STATE |
  typeof MATCHED_CARD_STATE;

export interface Card {
  id: string;
  image: string;
  state: CardState;
  name: string;
}
