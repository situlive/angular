import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  get(clImage: any): any {
    let parent = clImage.el.nativeElement;
    let children = parent.children;
    if (children.length !== 1) return;
    let image = children[0];
    return image;
  }
}
