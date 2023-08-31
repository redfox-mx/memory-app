import { Component, OnDestroy, OnInit } from '@angular/core';
import { Board } from '../../board';
import { GameServiceController } from '../../services/game.service';
import { Card } from '../../card'
import { Dialog } from '@angular/cdk/dialog'
import { UserStorage } from '@memory/storage'
import { UsernameFormComponent } from '../../modals/username-form/username.form'
import { WinnerDialogComponent } from '../../modals/winner/winner.modal'
import { Subscription } from 'rxjs'



@Component({
  templateUrl: './game.html',
  styleUrls: ['./game.scss']
})
export class GameView implements OnInit, OnDestroy {

  public board: Board = [];

  // Most people think all subscriptions must be unsubscribed manually, but
  // when an observable is completed, all its subscriptions are unsubscribed
  // automatically. Most subscriptions on this page are automatically
  // unsubscribed but the subscriptions array is added to handle
  // unsubscriptions in the OnDestroy lifecycle hook.
  subscriptions: Subscription[] = [];

  constructor(
    public controller: GameServiceController,
    public dialog: Dialog,
    public userStorage: UserStorage
  ) {}

  selectCard(card: Card) {
    this.controller.selectCard(card);
    if(this.controller.isCompleted) {
      const dialogRef = this.dialog.open<boolean>(WinnerDialogComponent);
      this.subscriptions.push(
        dialogRef.closed.subscribe(playAgain => playAgain && this.startGame())
      );
    }
  }

  startGame() {
    this.subscriptions.push(
      this.controller.newGame().subscribe((el) => this.board = el)
    )
  }

  ngOnInit(): void {
    if(this.userStorage.username) {
      this.startGame();
    } else {
      const dialogRef = this.dialog
        .open<string>(UsernameFormComponent, { disableClose: true, width: '300px' });
      this.subscriptions.push(
        dialogRef.closed.subscribe(result => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- user only can close dialog if username is setted
          this.userStorage.username = result!;
          this.startGame();
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
