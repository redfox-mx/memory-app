import { Injectable } from '@angular/core'
import { Board, generateBoard } from '../board'
import { Card, DEFAULT_CARD_STATE, MATCHED_CARD_STATE, SELECTED_CARD_STATE } from '../card'
import { CardsRepository } from './cards.repository'
import { map, tap } from 'rxjs/operators'
import { LiveAnnouncer } from '@angular/cdk/a11y'

export const INITIAL_MOVEMENT = 'initial' as const;
export const COMPARE_MOVEMENT = 'compare' as const;

export type MovementType =
  typeof INITIAL_MOVEMENT | typeof COMPARE_MOVEMENT;

const findById =
  (source: { id: unknown }) =>
    <T>(target: { id: unknown } & T) => source.id === target.id;


@Injectable({ providedIn: 'root' })
export class GameServiceController {

  public board: Board = [];

  public totalMatches = 0;

  public currentMovement: MovementType = INITIAL_MOVEMENT;

  public cardSelected?: Card;

  public matches = 0;

  public errors = 0;

  public gameStarted = false;

  public get isCompleted() {
    return this.gameStarted && this.matches === this.totalMatches;
  }

  constructor(
    private repository: CardsRepository,
    private liveAnnouncer: LiveAnnouncer
  ) {}

  newGame() {
    return this.repository.get()
      .pipe(
        map(generateBoard),
        tap(this.resumeGame.bind(this))
      );
  }

  resumeGame(board: Board) {
    this.gameStarted = true;
    this.board = board;
    this.totalMatches = board.length / 2;
    this.matches = 0;
    this.errors = 0;
    this.currentMovement = INITIAL_MOVEMENT;
    this.cardSelected = undefined;
    this.restoreBoard();
  }

  selectCard(source: Card){
    const card = this.board.find(findById(source));
    if(!card) return; // card does not exist

    if(card.state !== DEFAULT_CARD_STATE) return; // selected and matched states must be skiped
    this.liveAnnouncer.announce(card.name + 'card selected');
    card.state = SELECTED_CARD_STATE;

    if(this.currentMovement === COMPARE_MOVEMENT) {
      this.match(source)
      this.currentMovement = INITIAL_MOVEMENT;
      this.cardSelected = undefined;
      setTimeout(() => this.restoreBoard(), 500)
      return;
    }

    this.cardSelected = card;
    this.currentMovement = COMPARE_MOVEMENT;
  }

  match(source: Card) {
    if(!this.cardSelected) return false;

    const card = this.board.find(e => e.id === source.id);

    // 1. diferent names is not a match
    // 2. same card id is not a match
    if(!card || this.cardSelected?.name !== card.name || this.cardSelected?.id === card.id) {
      this.errors++;
      this.liveAnnouncer.announce(this.cardSelected.name + 'card no match with ' + source.name + 'card');
      return false;
    }

    this.cardSelected.state = MATCHED_CARD_STATE;
    card.state = MATCHED_CARD_STATE;

    this.matches++;
    this.liveAnnouncer.announce('match!')
    return true;
  }

  restoreBoard() {
    for(const card of this.board) {
      if(card.state === SELECTED_CARD_STATE) {
        card.state = DEFAULT_CARD_STATE;
      }
    }
  }

}
