import { isPlatformServer } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'situ-responsive-background-video',
  templateUrl: './responsive-background-video.component.html',
  styleUrls: ['./responsive-background-video.component.scss'],
})
export class ResponsiveBackgroundVideoComponent implements OnInit {
  private baseUrl: string = 'https://res.cloudinary.com/';
  private currentBreakpoint: number = 1920;

  @Input() publicId: string;
  @Input() formats: string[] = ['mp4', 'webm', 'ogv'];
  @Input() breakpoints: number[] = [480, 576, 768, 992, 1200, 1366, 1920];

  public videos: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private cloudinaryService: Cloudinary
  ) {}

  ngOnInit(): void {
    this.updateBreakpoint();

    let cloudName = this.getCloudName();
    let width = this.getWidth();

    this.formats.forEach((format: string) => {
      this.videos.push(this.getVideo(format, cloudName, width));
    });
  }

  private updateBreakpoint(): void {
    if (isPlatformServer(this.platformId)) return;
    this.currentBreakpoint = window.innerWidth;
  }

  private getVideo(format: string, cloudName: string, width: string): any {
    let type = 'video/mp4';

    switch (format) {
      case 'ogv':
        type = 'video/ogg';
        break;
      default:
        type = `video/${format}`;
        break;
    }

    return {
      url: `${this.baseUrl}${cloudName}/video/upload/${width}/v1604336032/${this.publicId}.${format}`,
      type,
    };
  }

  private getCloudName(): string {
    let instance = this.cloudinaryService.cloudinaryInstance;
    if (!instance) return null;

    let config = instance.config();
    return config.cloud_name;
  }

  private getWidth(): string {
    let width = '';

    this.breakpoints.forEach((breakpoint: number, i: number) => {
      if (
        (i === 0 ||
          this.currentBreakpoint < this.breakpoints[i - 1] ||
          this.currentBreakpoint >= breakpoint) &&
        (i > 0 || this.currentBreakpoint >= breakpoint)
      )
        return;
      width = `c_scale,w_${breakpoint - 1}/`;
    });

    return width;
  }
}
