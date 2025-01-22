import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PersonaRoutingModule } from './persona-routing.module';
import { PersonaPIUuPersonaComponent } from './piu_persona.component';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PersonaRoutingModule
  ],
  declarations: [
    PersonaPIUuPersonaComponent
  ],
  exports: [
    PersonaPIUuPersonaComponent
  ]
})
export class PersonaModule { }
