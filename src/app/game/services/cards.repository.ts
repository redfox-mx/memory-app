import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, InjectionToken, isDevMode } from '@angular/core'
import { map } from 'rxjs/operators'
import { Card, DEFAULT_CARD_STATE } from '../card'

/**
 * Partial json response type
 */
export interface PartialCardsResponse {
  entries: {
    meta: {
      name: string;
      uuid: string;
    }
    fields: {
      image: {
        url: string;
        uuid: string;
        title: string;
      }
    }
  }[];
  meta: unknown; // is not usefull for now
}

export function amountOfCardFactory() {
  return isDevMode() ? 3 : 20;
}

/**
 * Injection token for set amout of cards fetched by remote service
 *
 * **note:** Game board size is `2 * amoutOfCards`
 */
export const AMOUNT_OF_CARDS_PROVIDER = new InjectionToken('AmountOfCard', { factory: amountOfCardFactory })


export const createUrl = (n: number) =>
  `https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${n}`;

function response2cards(response: PartialCardsResponse): Card[] {
  return response.entries.map((entry) => ({
    id: entry.meta.uuid,
    name: entry.fields.image.title,
    image: entry.fields.image.url,
    state: DEFAULT_CARD_STATE
  }))
}

@Injectable({ providedIn: 'root' })
export class CardsRepository {

  constructor(
    @Inject(AMOUNT_OF_CARDS_PROVIDER) private _amountOfCard: number,
    private _http: HttpClient
  ){}

  get() {
    return this._http.get<PartialCardsResponse>(createUrl(this._amountOfCard))
      .pipe(map(response2cards))
  }
}
