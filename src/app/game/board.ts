import { Card } from './card'


export type Board = Card[]

export function multiply<T>(n: number, arr: ReadonlyArray<T>): Array<T> {
  const target: Array<T> = [];
  for(let i = 0; i < n; i++) {
    arr.forEach(e => target.push(e))
  }
  return target;
}


export function generateBoard(cards: Card[]): Board {
  const board = [...cards, ...cards];
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
