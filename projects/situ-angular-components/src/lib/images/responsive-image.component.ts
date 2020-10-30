import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'situ-responsive-image',
  templateUrl: './responsive-image.component.html',
})
export class ResponsiveImageComponent implements OnInit {
  @Input() publicId: string;

  constructor() {}

  ngOnInit(): void {}
}
