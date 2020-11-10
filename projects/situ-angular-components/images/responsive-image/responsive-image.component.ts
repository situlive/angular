import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'situ-responsive-image',
  templateUrl: './responsive-image.component.html',
  styleUrls: ['./responsive-image.component.scss'],
})
export class ResponsiveImageComponent implements OnInit {
  @Input() publicId: string;
  @Input() width: number;
  @Input() class: string;

  constructor(private elementRef: ElementRef) {}

  public ngOnInit(): void {
    this.setWidth();
  }

  private setWidth(): void {
    if (this.width) return;
    this.width = Math.ceil(
      this.elementRef.nativeElement.getBoundingClientRect().width
    );
  }
}
