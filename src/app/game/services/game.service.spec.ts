import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
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
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CardsRepository, useValue: fakeCardsRepository }
      ]
    })
    fixture = TestBed.inject(GameServiceController);
    httpController = TestBed.inject(HttpTestingController);
  })

  it('should be defined', () => {
    expect(fixture).toBeDefined();
  })
})
