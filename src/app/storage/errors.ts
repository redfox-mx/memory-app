
export class LocalStorageNotFout extends Error {

  constructor(message: string) {
    super('[local storage]: ' + message)
  }
}
