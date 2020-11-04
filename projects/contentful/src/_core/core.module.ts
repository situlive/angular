import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, RouterModule, BrowserTransferStateModule],
})
export class CoreModule {}
