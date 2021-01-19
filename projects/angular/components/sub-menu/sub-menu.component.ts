import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MenuItem } from './menu-item';

@Component({
  selector: 'situ-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('open', [
      state(
        'true',
        style({
          height: '*',
        })
      ),
      state('false', style({ height: '0', overflow: 'hidden' })),
      transition('* => *', animate(200)),
    ]),
  ],
})
export class SubMenuComponent implements OnInit {
  @Input() items: MenuItem[];

  constructor() {}

  public ngOnInit(): void {}
}
