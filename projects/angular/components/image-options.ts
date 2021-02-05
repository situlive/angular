export class ImageOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'crop';
  placeholder?: 'blur' | 'pixelate' | 'vectorize' | 'predominant';
  gravity:
    | 'auto'
    | 'face'
    | 'faces'
    | 'center'
    | 'north'
    | 'north_east'
    | 'north_west'
    | 'south'
    | 'south_east'
    | 'south_west'
    | 'east'
    | 'west';
  quality: 'auto' | 'best' | 'good' | 'eco' | 'low';
}
