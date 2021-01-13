import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuHeader } from './menu-header';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MenuComponent, MenuHeader],
  exports: [MenuComponent, MenuHeader],
})
export class MenuModule {}
