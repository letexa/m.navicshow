import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { PaginationRouting } from './pagination.routing';

@NgModule({
  declarations: [ PaginationComponent ],
  exports: [ PaginationComponent ],
  imports: [ CommonModule, PaginationRouting ],
})

export class PaginationModule { }