import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-facebook-icon]',
  templateUrl: './facebook-icon.component.html',
  styleUrls: ['./facebook-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FacebookIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/facebook.svg')
    );
  }

  public ngOnInit(): void {}
}
