import { Injectable } from '@angular/core';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  get nativeWindow(): any {
    return getWindow();
  }
}
