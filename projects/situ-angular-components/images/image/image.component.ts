import { isPlatformServer } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

import { ImageOptions } from '../_core/models';
import { ImageService } from '../_core/services';

@Component({
  selector: 'situ-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @ViewChild('image', { static: true })
  image: any;
  @Input() publicId: string;
  @Input() class: string;
  @Input() options: ImageOptions;
  @Input() debug: boolean;
  @Output() onLoaded: EventEmitter<void> = new EventEmitter();

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    public elementRef: ElementRef,
    private imageService: ImageService
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
    this.setAlt();
  }

  public load(): void {
    this.onLoaded.emit();
  }

  private setAlt(): void {
    let image = this.imageService.get(this.image);
    if (!image) return;
  }

  private setWidth(): void {
    let rect = this.elementRef.nativeElement.getBoundingClientRect();

    if (!this.options.width) {
      this.options.width = Math.ceil(Math.ceil(rect.width));
    }

    if (!this.options.height) {
      this.options.height = Math.ceil(rect.height);
    }
  }
}
