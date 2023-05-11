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

import { lazyload, placeholder } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOnValue } from '@cloudinary/url-gen/qualifiers/focusOn';

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
  public img: CloudinaryImage;
  public alt: string;
  public plugins: any[];

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
    this.createImage();
  }

  public load(): void {
    this.onLoaded.emit();
  }

  private createImage(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: this.imageService.cloudName,
      },
    });

    this.plugins = [
      lazyload(),
      placeholder({ mode: this.options.placeholder }),
    ];

    this.img = cld
      .image(this.publicId)
      .format('auto')
      .resize(
        thumbnail(
          this.options.width || undefined,
          this.options.height || undefined
        ).gravity(focusOn(new FocusOnValue(this.options.gravity)))
      )
      .quality(this.options.quality);
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

    if (['fill', 'crop'].indexOf(this.options.crop) > -1)
      this.options.gravity = '';

    if (this.options.width || this.options.height) return;

    let rect = this.elementRef.nativeElement.getBoundingClientRect();

    this.options.width = Math.ceil(Math.ceil(rect.width));
    this.options.height = Math.ceil(rect.height);
  }
}
