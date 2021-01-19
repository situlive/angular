import { Directive, Input } from '@angular/core';

@Directive({
    selector: `app-menu-header`,
    host: {
        class: 'app-menu-header',
        '[class.app-menu-header-align-end]': 'align === "end"',
    },
})
export class MenuHeader {
    @Input() align: 'start' | 'end' = 'end';
}
