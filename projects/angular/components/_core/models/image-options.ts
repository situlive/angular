export class ImageOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'crop' | 'fit';
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
    | 'west'
    | 'auto:none'
    | '';
  quality: number;
}
