import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudSIUudummyuPreexistenciasComponent } from './siu_dummy_preexistencias.component';
import { SolicitudSIUudummyuDiferenciasLiqComponent } from './siu_dummy_diferenciasliq.component';
import { SolicitudSIUuTCREARSEGUNDAFIRMAComponent } from './siu_tcrearsegundafirma.component';
import { SolicitudSIUuTENVIARDOCComponent } from './siu_tenviardoc.component';
import { SolicitudIIUuDiferenciasLiquidacionComponent } from './iiu_diferenciasliquidacion.component';
import { SolicitudMDIUuSolicitudPreexistenciasComponent } from './mdiu_solicitudpreexistencias.component';
import { SolicitudPIUuRadicadosuObsComponent } from './piu_radicados_obs.component';
import { SolicitudPIUuEnvioDocComponent } from './piu_enviodoc.component';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    SolicitudRoutingModule
  ],
  declarations: [
    SolicitudSIUudummyuPreexistenciasComponent,
    SolicitudSIUudummyuDiferenciasLiqComponent,
    SolicitudSIUuTCREARSEGUNDAFIRMAComponent,
    SolicitudSIUuTENVIARDOCComponent,
    SolicitudIIUuDiferenciasLiquidacionComponent,
    SolicitudMDIUuSolicitudPreexistenciasComponent,
    SolicitudPIUuRadicadosuObsComponent,
    SolicitudPIUuEnvioDocComponent
  ],
  exports: [
    SolicitudSIUudummyuPreexistenciasComponent,
    SolicitudSIUudummyuDiferenciasLiqComponent,
    SolicitudSIUuTCREARSEGUNDAFIRMAComponent,
    SolicitudSIUuTENVIARDOCComponent,
    SolicitudIIUuDiferenciasLiquidacionComponent,
    SolicitudMDIUuSolicitudPreexistenciasComponent,
    SolicitudPIUuRadicadosuObsComponent,
    SolicitudPIUuEnvioDocComponent
  ]
})
export class SolicitudModule { }
