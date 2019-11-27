import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuModule } from '../widget/main-menu/menu.module';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    MenuModule,
    IonicModule
  ],
})

export class IndexModule { }