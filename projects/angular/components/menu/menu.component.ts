import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavigationStart, Router } from '@angular/router';

export type color = 'blue' | 'white' | 'transparent';

@Component({
  selector: 'situ-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None, // https://github.com/angular/components/blob/master/src/material/card/card.ts
  animations: [
    trigger('slide', [
      state(
        'true',
        style({
          transform: 'translateX(0px) translateZ(0px)',
          opacity: 1,
        })
      ),
      state(
        'false',
        style({ transform: 'translateX(100%) translateZ(0px)', opacity: 0 })
      ),
      transition('* => *', animate(200)),
    ]),
  ],
})
export class MenuComponent implements OnInit {
  private originalColour: color;

  public isExpanded: boolean = false;

  @Input() color: color = 'blue';
  @Input() position: 'relative' | 'absolute' = 'relative';
  @Input() transparent: boolean = false;
  @Input() hideToggle: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.originalColour = this.color;
    this.routeChange();
  }

  public expand() {
    this.isExpanded = !this.isExpanded;
    this.setColour(this.isExpanded);
  }

  private setColour(expanded: boolean) {
    this.color =
      expanded && this.originalColour !== 'blue'
        ? 'transparent'
        : this.originalColour;
  }

  private routeChange(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isExpanded = false; // Close our menu
      }
    });
  }
}
