import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ParentescoDomRoutingModule } from './parentescodom-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ParentescoDomRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ParentescoDomModule { }
