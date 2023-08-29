import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AMOUNT_OF_CARDS_PROVIDER, CardsRepository, PartialCardsResponse, createUrl } from './cards.repository';
import { Card, DEFAULT_CARD_STATE } from '../card'

const partialResponse: PartialCardsResponse = {
  meta: null,
  entries: [
    {
      meta: {
        name: 'lion',
        uuid: '12345'
      },
      fields: {
        image: {
          url: 'http://www.image.com/lion',
          uuid: '1234589',
          title: 'Lion'
        }
      }
    }
  ]
}

const mappedResponse: Card[] = [
  {
    id: '12345',
    name: 'Lion',
    image: 'http://www.image.com/lion',
    state: DEFAULT_CARD_STATE
  }
]

describe('card repository', () => {
  let fixture: CardsRepository;
  let httpTestingController: HttpTestingController;
  const allowedItemsCount = 2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: AMOUNT_OF_CARDS_PROVIDER,
          useValue: allowedItemsCount
        }
      ]
    })

    fixture = TestBed.inject(CardsRepository);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it('should handle card request', () => {
    fixture.get()
      .subscribe(data => {
        expect(data).toHaveLength(1);
        expect(data).toEqual(mappedResponse)
      })

    const req = httpTestingController.expectOne(createUrl(allowedItemsCount))
    expect(req.request.method).toEqual('GET');
    req.flush(partialResponse);

    httpTestingController.verify();
  })
})
