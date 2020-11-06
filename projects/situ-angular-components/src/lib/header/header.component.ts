import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'situ-header',
  templateUrl: './header.component.html',
  styles: ['./header.component.scsss'],
})
export class HeaderComponent implements OnInit {
  @Input() toggle: boolean;
  @Input() transparent: boolean;
  @Input() color: string = 'blue';

  constructor() {}

  ngOnInit(): void {}
}
