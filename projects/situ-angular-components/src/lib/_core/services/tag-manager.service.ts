import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root',
})
export class TagManagerService {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private windowService: WindowService
  ) {
    if (isPlatformServer(this.platformId)) return;
    this.windowService.nativeWindow.dataLayer = window.dataLayer || [];
  }

  public engage(action: string, label: string, value: string) {
    if (isPlatformServer(this.platformId)) return;
    this.windowService.nativeWindow.dataLayer.push({
      event: 'engage',
      category: 'engage',
      action,
      label,
      value,
    });
  }
}
