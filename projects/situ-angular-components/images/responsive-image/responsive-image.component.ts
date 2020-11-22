import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { ImageOptions } from '../_core/models';

@Component({
  selector: 'situ-responsive-image',
  templateUrl: './responsive-image.component.html',
  styleUrls: ['./responsive-image.component.scss'],
})
export class ResponsiveImageComponent implements OnInit {
  private defaults: ImageOptions = {
    width: 0,
    height: 0,
    crop: 'crop',
    multiplier: 1,
  };

  @Input() publicId: string;
  @Input() class: string;
  @Input() options: ImageOptions;

  public initialized: boolean;

  constructor(private elementRef: ElementRef) {
    this.options = { ...this.defaults, ...(this.options || {}) };
  }

  public ngOnInit(): void {
    this.setWidth();
  }

  private setWidth(): void {
    if (!this.options.width) {
      this.options.width = Math.ceil(
        Math.ceil(
          this.elementRef.nativeElement.getBoundingClientRect().width *
            this.options.multiplier
        )
      );
    }

    if (!this.options.height) {
      this.options.height = Math.ceil(
        this.elementRef.nativeElement.getBoundingClientRect().height
      );
    }

    this.initialized = true;
    console.log(this.options);
  }
}
