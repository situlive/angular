import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-tiktok-icon]',
  templateUrl: './tiktok-icon.component.html',
  styleUrls: ['./tiktok-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TiktokIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'tiktok',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/tiktok.svg')
    );
  }

  public ngOnInit(): void {}
}
