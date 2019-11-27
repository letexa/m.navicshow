import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    AppRoutingModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule { }