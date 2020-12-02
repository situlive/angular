import { isPlatformServer } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

import { ImageOptions } from '../_core/models';

@Component({
  selector: 'situ-responsive-image',
  templateUrl: './responsive-image.component.html',
  styleUrls: ['./responsive-image.component.scss'],
})
export class ResponsiveImageComponent implements OnInit {
  @Input() publicId: string;
  @Input() class: string;
  @Input() options: ImageOptions;
  @Input() debug: boolean;

  public initialized: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    public elementRef: ElementRef
  ) {
    this.options = {
      width: this.options?.width,
      height: this.options?.height,
      crop: this.options?.crop || 'crop',
    };
  }

  public ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.setWidth();
  }

  private setWidth(): void {
    if (!this.options.width) {
      this.options.width = Math.ceil(
        Math.ceil(this.elementRef.nativeElement.getBoundingClientRect().width)
      );
    }

    if (!this.options.height) {
      this.options.height = Math.ceil(
        this.elementRef.nativeElement.getBoundingClientRect().height
      );
    }

    this.initialized = true;
  }
}
