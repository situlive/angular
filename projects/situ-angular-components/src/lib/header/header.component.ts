import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'situ-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() toggle: boolean;
  @Input() transparent: boolean;
  @Input() color: 'blue' | 'white' | 'jade' = 'blue';
  @Input() position: 'fixed' | 'relative' | 'absolute' = 'fixed';
  @Input() top: string = '0';

  constructor() {}

  ngOnInit(): void {}
}
