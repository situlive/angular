import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

export const fade = trigger('fade', [
  state(
    'collapsed',
    style({
      opacity: '0',
    })
  ),
  state(
    'expanded',
    style({
      opacity: '1',
    })
  ),
  transition('collapsed=>expanded', animate('250ms')),
  transition('expanded=>collapsed', animate('250ms')),
]);
