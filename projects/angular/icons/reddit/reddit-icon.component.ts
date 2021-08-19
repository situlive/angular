import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-reddit-icon]',
  templateUrl: './reddit-icon.component.html',
  styleUrls: ['./reddit-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RedditIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'reddit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/reddit.svg')
    );
  }

  public ngOnInit(): void {}
}
