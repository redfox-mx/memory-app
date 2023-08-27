import { InjectionToken } from '@angular/core';

export function localStorageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null // SSR localStorage implementation
    : localStorage;
}

export const LocalStorage = new InjectionToken('LocalStorage', { factory: localStorageFactory });
