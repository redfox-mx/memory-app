import { HttpClientTestingModule } from '@angular/common/http/testing'
import { GameServiceController } from './game.service'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { Card } from '../card'
import { CardsRepository } from './cards.repository'

const fakeCardsRepository = {
  get: () => of<Card[]>([
    { id: 'card-1', name: 'lion', image: '', state: 'default' },
    { id: 'card-1.copy', name: 'lion', image: '', state: 'default' },
    { id: 'card-2', name: 'fish', image: '', state: 'default' },
    { id: 'card-2.copy', name: 'fish', image: '', state: 'default' },
  ])
}

describe('game controller', () => {
  let fixture: GameServiceController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CardsRepository, useValue: fakeCardsRepository }
      ]
    })
    fixture = TestBed.inject(GameServiceController);
  })

  it('should be defined', () => {
    expect(fixture).toBeDefined();
  })
})
