import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-instagram-icon]',
  templateUrl: './instagram-icon.component.html',
  styleUrls: ['./instagram-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstagramIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/instagram.svg'
      )
    );
  }

  public ngOnInit(): void {}
}
