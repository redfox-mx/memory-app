import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { UserStorage } from '@memory/storage'

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner.html',
  styleUrls: ['./winner.scss']
})
export class WinnerDialogComponent {
  constructor(
    public dialogRef: DialogRef<boolean>,
    public userStorage: UserStorage
  ) {}
}
