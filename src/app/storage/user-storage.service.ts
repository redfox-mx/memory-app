import { Inject, Injectable } from '@angular/core'
import { LocalStorage } from './injection-tokens'
import { LocalStorageNotFout } from './errors'


const USER_STORE_KEYS = {
  USERNAME: 'username'
} as const


@Injectable({ providedIn: 'root' })
export class UserStorage {

  constructor(@Inject(LocalStorage) private _storage: Storage) {
    // in production environments this error must be handled
    if(_storage === null) throw new LocalStorageNotFout('locall storage is not supported');
  }


  public set username(username: string) {
    this._storage.setItem(USER_STORE_KEYS.USERNAME, username);
  }

  public get username(): string | null {
    return this._storage.getItem(USER_STORE_KEYS.USERNAME);
  }


}
