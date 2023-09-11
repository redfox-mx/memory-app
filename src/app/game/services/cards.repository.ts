import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, InjectionToken, inject } from '@angular/core'
import { map } from 'rxjs/operators'
import { Card, DEFAULT_CARD_STATE } from '../card'
import { BreakpointObserver } from '@angular/cdk/layout';

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
  const breakpointObserver = inject(BreakpointObserver);
  const isPhone = breakpointObserver.isMatched('(max-width: 426px)');
  const isTablet = breakpointObserver.isMatched('(max-width: 768px)')

  // Set amount of cards based on initial screen size since
  return isPhone ? 12
    : isTablet ? 15
    : 20;
}

/**
 * Injection token for set amout of cards fetched by remote service
 *
 * **note:** Game board size is:
 * - 12 unique images for phone devices
 * - 15 unique images for tablet devices
 * - 20 unique images for desktop applications
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
