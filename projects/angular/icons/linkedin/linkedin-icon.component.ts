import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-linkedin-icon]',
  templateUrl: './linkedin-icon.component.html',
  styleUrls: ['./linkedin-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LinkedinIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/linkedin.svg')
    );
  }

  public ngOnInit(): void {}
}
