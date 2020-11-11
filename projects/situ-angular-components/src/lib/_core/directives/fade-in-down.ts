import {
  animation,
  animate,
  keyframes,
  style,
  AnimationReferenceMetadata,
} from '@angular/animations';

export const fadeInDown: AnimationReferenceMetadata = animation([
  animate(
    '1000ms 0ms',
    keyframes([
      style({
        visibility: 'visible',
        opacity: 0,
        transform: 'translate3d(0, -100px, 0)',
        easing: 'ease',
        offset: 0,
      }),
      style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        easing: 'ease',
        offset: 1,
      }),
    ])
  ),
]);
