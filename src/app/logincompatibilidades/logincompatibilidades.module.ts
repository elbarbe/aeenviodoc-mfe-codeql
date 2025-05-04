import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogIncompatibilidadesRoutingModule } from './logincompatibilidades-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogIncompatibilidadesRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogIncompatibilidadesModule { }
