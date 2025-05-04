import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogHistoricoPlanesRoutingModule } from './loghistoricoplanes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogHistoricoPlanesRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogHistoricoPlanesModule { }
