import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-tumblr-icon]',
  templateUrl: './tumblr-icon.component.html',
  styleUrls: ['./tumblr-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TumblrIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'tumblr',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/tumblr.svg')
    );
  }

  public ngOnInit(): void {}
}
