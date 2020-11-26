import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image.component';

@Component({
  selector: '[situ-responsive-background-image]',
  templateUrl: './responsive-background-image.component.html',
  styleUrls: ['./responsive-background-image.component.scss'],
})
export class ResponsiveBackgroundImageComponent implements AfterViewInit {
  @ViewChild('backgroundImage', { static: false })
  responsiveImage: ResponsiveImageComponent;

  @Input() publicId: string;
  @Input() debug: boolean;

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngAfterViewInit(): void {
    this.hideImage();
  }

  private hideImage(): void {
    let parent = this.responsiveImage.elementRef.nativeElement;
    let children = parent.children;
    if (children.length !== 1) return;
    let child = children[0];
    let image = child.querySelector('img');
    if (!image) return;
    let src = image.getAttribute('src');

    let host = this.element.nativeElement;
    this.renderer.setStyle(host, 'background-image', `url('${src}')`);
    this.renderer.setStyle(host, 'background-size', 'cover');
    this.renderer.setStyle(host, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(host, 'background-position', 'center center');

    this.renderer.setStyle(child, 'display', 'none');
  }
}
