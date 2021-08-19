import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-pinterest-icon]',
  templateUrl: './pinterest-icon.component.html',
  styleUrls: ['./pinterest-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PinterestIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'pinterest',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/pinterest.svg'
      )
    );
  }

  public ngOnInit(): void {}
}
