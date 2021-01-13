import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { ImageComponent } from '../image/image.component';
import { ImageOptions } from '../_core/models';

@Component({
  selector: '[situ-background-image]',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss'],
})
export class BackgroundImageComponent implements OnInit {
  @ViewChild('background', { static: false })
  image: ImageComponent;
  @Input() publicId: string;
  @Input() debug: boolean;
  @Input() options: ImageOptions;
  @Output() onLoaded: EventEmitter<void> = new EventEmitter();

  constructor(private renderer: Renderer2, private element: ElementRef) {
    this.options = {
      width: this.options?.width,
      height: this.options?.height,
      crop: this.options?.crop || 'fill',
      placeholder: this.options?.placeholder || 'predominant',
      gravity: this.options?.gravity || 'faces',
      quality: this.options?.quality || 'low',
    };
  }

  ngOnInit(): void {}

  public loaded(): void {
    let parent = this.image.elementRef.nativeElement;
    let image = parent.querySelector('img');
    if (!image) return;

    let src = image.getAttribute('src');
    let host = this.element.nativeElement;
    this.renderer.setStyle(host, 'background-image', `url('${src}')`);
    this.renderer.setStyle(host, 'background-size', 'cover');
    this.renderer.setStyle(host, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(host, 'background-position', 'center center');

    this.renderer.setStyle(parent, 'display', 'none');
    this.onLoaded.emit();
  }
}
