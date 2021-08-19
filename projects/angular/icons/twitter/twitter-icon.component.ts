import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-twitter-icon]',
  templateUrl: './twitter-icon.component.html',
  styleUrls: ['./twitter-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TwitterIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'twitter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/twitter.svg')
    );
  }

  public ngOnInit(): void {}
}
