import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'situ-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() colour: string = 'white';
  @Input() position: 'relative' | 'absolute' | 'fixed' = 'absolute';
  public cssClass: string;

  constructor() {}

  ngOnInit(): void {
    this.cssClass = this.setCssClass();
  }

  private setCssClass(): string {
    switch (this.colour) {
      case 'blue':
      case 'primary':
      case 'dark':
        return 'section-dark';
      case 'jade':
        return 'section-jade';
      case 'off-white':
        return 'section-off-white';
      case 'grey':
      case 'gray':
        return 'section-grey';
      case 'dark-grey':
      case 'dark-gray':
        return 'dark-section-grey';
      default:
        return 'section-white';
    }
  }
}
