import { animation, animate, keyframes, style } from '@angular/animations';

export const fadeInUp = animation([
  animate(
    '1000ms 0ms',
    keyframes([
      style({
        visibility: 'visible',
        opacity: 0,
        transform: 'translate3d(0, 100px, 0)',
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
