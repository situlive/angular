import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class TagManagerService {
  constructor(@Inject(PLATFORM_ID) private platformId) {
    if (isPlatformServer(this.platformId)) return;
    window.dataLayer = window.dataLayer || [];
  }

  public engage(action: string, label: string, value: string) {
    if (isPlatformServer(this.platformId)) return;
    window.dataLayer.push({
      event: 'engage',
      category: 'engage',
      action,
      label,
      value,
    });
  }
}
