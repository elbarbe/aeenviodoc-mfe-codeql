import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { AnexoNeoRoutingModule } from './anexoneo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AnexoNeoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AnexoNeoModule { }
