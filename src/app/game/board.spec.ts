import { generateBoard, multiply } from './board'
import { Card } from './card'

describe('multiply', () =>  {
  const array = [1,2,3,4,5,6,7,8,9,10];

  it('should create a new array', () => {
    expect(multiply(1, array)).not.toBe(array);
  })

  it('should have n times lenght of original array', () => {
    expect(multiply(2, array).length).toBe(array.length * 2);
  })

  it('should copy all elements in order', () => {
    const isEqual = (source: Array<unknown>, target: Array<unknown>) => {
      if(source.length !== target.length) return false

      for(let i = 0; i < source.length; i++) {
        if(source[i] !== target[i]) return false
      }

      return true;
    }

    const multiplied = multiply(2, array);
    expect(isEqual(multiplied.slice(array.length), array)).toBeTruthy()
    expect(isEqual(multiplied.slice(-array.length), array)).toBeTruthy()
  })
})

describe('Generate Board', () => {
  const cards = createCards(10);

  it('should create a 2n board for a given cards', () => {
    const board = generateBoard(cards);
    expect(board.length).toBe(cards.length * 2)
  })
})

function createCards(n: number) {
  const cards: Card[] =  []
  for(let i = 0; i < n; i++) {
    cards.push({
      id: i.toString(),
      image: `image-${i}`,
      state: 'default'
    })
  }
  return cards
}
