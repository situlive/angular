import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

export const collapse = trigger('collapse', [
  state(
    'collapsed',
    style({
      height: '0',
      overflow: 'hidden',
      opacity: '0',
    })
  ),
  state(
    'expanded',
    style({
      overflow: 'hidden',
      opacity: '1',
    })
  ),
  transition('collapsed=>expanded', animate('250ms')),
  transition('expanded=>collapsed', animate('250ms')),
]);
