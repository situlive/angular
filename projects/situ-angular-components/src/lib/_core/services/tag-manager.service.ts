import { Injectable } from '@angular/core';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class TagManagerService {
  constructor() {
    window.dataLayer = window.dataLayer || [];
  }

  public engage(action: string, label: string, value: string) {
    window.dataLayer.push({
      event: 'engage',
      category: 'engage',
      action,
      label,
      value,
    });
  }
}
