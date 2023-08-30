import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-username-form-dialog',
  templateUrl: './username.html',
  styleUrls: ['./username.scss']
})
export class UsernameFormComponent {
  constructor(
    public dialogRef: DialogRef<string>,
  ) {}

  public username = '';

  shouldClose() {
    const username = this.username.trim()
    if(!username) return;

    this.username = username;
    this.dialogRef.close(username)
  }
}
