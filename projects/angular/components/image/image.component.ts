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

import {
  ImageOptions,
  ImageService,
  ImageContext,
} from '@situlive/angular/components';

@Component({
  selector: 'situ-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  public alt: string;

  @ViewChild('image', { static: true })
  image: any;
  @Input() publicId: string;
  @Input() class: string;
  @Input() options: ImageOptions;
  @Output() onLoaded: EventEmitter<void> = new EventEmitter();

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    public elementRef: ElementRef,
    private imageService: ImageService
  ) {}

  public ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.getOptions();
    this.setAlt();
  }

  public load(): void {
    this.onLoaded.emit();
  }

  private setAlt(): void {
    this.imageService
      .getAltTag(this.publicId)
      .subscribe(
        (response: ImageContext) => (this.alt = response?.custom?.alt)
      );
  }

  private getOptions(): void {
    this.options = {
      width: this.options?.width,
      height: this.options?.height,
      crop: this.options?.crop || 'scale',
      placeholder: this.options?.placeholder || 'pixelate',
      gravity: this.options?.gravity,
      quality: this.options?.quality || 80,
    };

    if (['fill', 'crop'].indexOf(this.options.crop) === -1)
      this.options.gravity = '';

    if (this.options.width || this.options.height) return;

    let rect = this.elementRef.nativeElement.getBoundingClientRect();

    this.options.width = Math.ceil(Math.ceil(rect.width));
    this.options.height = Math.ceil(rect.height);
  }
}
