import { LocalStorage, localStorageFactory } from './injection-tokens'
import { UserStorage } from './user-storage.service'
import { Injector } from '@angular/core'

describe('User Storage Service', () => {
  let injector: Injector

  beforeEach(() => {
    injector = Injector.create({
      providers: [
        { provide: LocalStorage, useFactory: localStorageFactory },
        UserStorage
      ]
    })
  })

  it('should create a instance of UserStorage', () => {
    const userStorage = injector.get(UserStorage);

    expect(userStorage).toBeDefined();
  })

  it('should return an empty username by default', () => {
    const userStorage = injector.get(UserStorage);
    expect(userStorage.username).toBeNull();
  })

  it('should keep username value', () => {
    const userStorage = injector.get(UserStorage);

    userStorage.username = 'testusername'

    expect(userStorage.username).toBe('testusername')
  })
})
