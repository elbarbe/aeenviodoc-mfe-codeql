import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { SuperAdminRoutingModule } from './superadmin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    SuperAdminRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SuperAdminModule { }
