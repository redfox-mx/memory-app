import { generateBoard } from './board'
import { Card } from './card'

describe('Generate Board', () => {
  const cards = createCards(10);

  it('should create a 2n board for a given cards', () => {
    const board = generateBoard(cards);
    expect(board.length).toBe(cards.length * 2)
  })

  it('should generate uniques id', () => {
    const board = generateBoard(cards);
    expect(hasUniqueId(board)).toBeTruthy();
  })
})

function hasUniqueId(arr: { id: unknown }[]): boolean {
  const ids = new Map();
  for(const item of arr) {
    if(ids.has(item.id)) return false;
    ids.set(item.id, true);
  }
  return true;
}

function createCards(n: number) {
  const cards: Card[] =  []
  for(let i = 0; i < n; i++) {
    cards.push({
      id: i.toString(),
      image: `image-${i}`,
      state: 'default',
      name: ''
    })
  }
  return cards
}
