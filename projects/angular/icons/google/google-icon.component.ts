import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-google-icon]',
  templateUrl: './google-icon.component.html',
  styleUrls: ['./google-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GoogleIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/google.svg')
    );
  }

  public ngOnInit(): void {}
}
