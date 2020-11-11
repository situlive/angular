import { isPlatformServer } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'situ-responsive-image',
  templateUrl: './responsive-image.component.html',
  styleUrls: ['./responsive-image.component.scss'],
})
export class ResponsiveImageComponent implements OnInit {
  @Input() publicId: string;
  @Input() width: number;
  @Input() class: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private elementRef: ElementRef
  ) {}

  public ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.setWidth();
  }

  private setWidth(): void {
    if (this.width) return;
    this.width = Math.ceil(
      this.elementRef.nativeElement.getBoundingClientRect().width
    );
  }
}
