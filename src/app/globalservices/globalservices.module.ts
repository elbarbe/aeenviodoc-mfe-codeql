import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { GlobalServicesRoutingModule } from './globalservices-routing.module';
import { GSSIUuOGETREPORTEComponent } from './siu_ogetreporte.component';
import { GSSIUuOGETREPORTEuOutComponent } from './siu_ogetreporte_out.component';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    GlobalServicesRoutingModule
  ],
  declarations: [
    GSSIUuOGETREPORTEComponent,
    GSSIUuOGETREPORTEuOutComponent
  ],
  exports: [
    GSSIUuOGETREPORTEComponent,
    GSSIUuOGETREPORTEuOutComponent
  ]
})
export class GlobalServicesModule { }
