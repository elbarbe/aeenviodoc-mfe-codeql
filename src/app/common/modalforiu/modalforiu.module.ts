import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalForIUComponent } from './modalforiu.component';
import { DialogModule } from 'primeng/dialog';
import { CommonComponentsModule } from '../../commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DialogModule
  ],
  declarations: [
    ModalForIUComponent
  ],
  exports: [ModalForIUComponent]
})
export class ModalForIUModule { }
