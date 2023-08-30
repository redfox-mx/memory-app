import { Card } from './card'


export type Board = Card[]


export function generateBoard(cards: Card[]): Board {
  const newCards = cards.map(e => ({...e, id: e.id + '-copy'}))
  const board = [...cards, ...newCards];
  return shuffle(board);
}

export function shuffle<T>(arr: ReadonlyArray<T>) {
  const [...source] = arr;

  for(let idx = source.length - 1; idx > 0; idx--) {
    const randomIdx = Math.floor(Math.random() * (idx + 1))
    const temp = source[idx];
    source[idx] = source[randomIdx];
    source[randomIdx] = temp;
  }

  return source;
}
