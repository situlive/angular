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

import { ImageOptions, ImageService } from '@situlive/angular/components';

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
    let image = this.imageService.get(this.image);
    if (!image) return;
  }

  private getOptions(): void {
    this.options = {
      width: this.options?.width,
      height: this.options?.height,
      crop: this.options?.crop || 'crop',
      placeholder: this.options?.placeholder || 'pixelate',
      gravity: this.options?.gravity || 'faces',
      quality: this.options?.quality || 'good',
    };

    if (this.options.crop !== 'crop' && this.options.crop !== 'fill')
      this.options.gravity = 'auto';
    if (this.options.width || this.options.height) return;

    let rect = this.elementRef.nativeElement.getBoundingClientRect();

    this.options.width = Math.ceil(Math.ceil(rect.width));
    this.options.height = Math.ceil(rect.height);
  }
}
