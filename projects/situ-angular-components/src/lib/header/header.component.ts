import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'situ-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() toggle: boolean;

  constructor() {}

  ngOnInit(): void {}
}
