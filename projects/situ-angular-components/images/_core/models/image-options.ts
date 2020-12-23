export class ImageOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'crop';
  placeholder?: 'blur' | 'pixelate' | 'vectorize' | 'predominant';
  loading?: string;
}
