import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MenuItem } from './menu-item';
import { NavigationStart, Router } from '@angular/router';

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
export class SubMenuComponent implements OnInit, OnChanges {
  private copy: MenuItem[];
  private path: string;

  @Input() items: MenuItem[];
  @Input() filterable: boolean = false;
  @Input() maxChildren: number = 10;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.routeChange();
  }

  ngOnChanges(): void {
    if (!this.items?.length) return;

    this.items.forEach((item: MenuItem) => this.updateChildrenCount(item));
    this.copy = JSON.parse(JSON.stringify(this.items));
  }

  public filter(target: MenuItem): void {
    let link = this.items.find((link: MenuItem) => link.path === target.path); // Get our filterable list item
    if (!link) return;

    this.copy.forEach((item: MenuItem) => {
      if (item.path !== link.path) return;

      link.children = item.children.filter(
        (child: MenuItem) =>
          !target.filterChildren ||
          child.label
            .toLowerCase()
            .indexOf(target.filterChildren.toLowerCase()) > -1
      );
    });
  }

  private updateChildrenCount(item: MenuItem): void {
    item.childrenCount = item.children?.length;
    item.open =
      (item.path.indexOf(this.path) > -1 &&
        item.path !== '/' &&
        item.path.length <= this.path.length) ||
      item.path === this.path;

    if (!item.children?.length) return;

    item.children.forEach((child: MenuItem) => this.updateChildrenCount(child));
  }

  private routeChange(): void {
    this.path = this.router.url;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.path = this.router.url;
      }
    });
  }
}
