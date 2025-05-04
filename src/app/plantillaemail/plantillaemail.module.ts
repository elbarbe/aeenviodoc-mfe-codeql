import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PlantillaEmailRoutingModule } from './plantillaemail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PlantillaEmailRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PlantillaEmailModule { }
