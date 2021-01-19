import {
  trigger,
  transition,
  style,
  animate,
  state,
  AnimationMetadata,
} from '@angular/animations';

export const fade: AnimationMetadata = trigger('fade', [
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
