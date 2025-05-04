import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopStateNavigationGuard } from '../common/popStateNavigationGuard';
import { LoginGuard } from '../common/loginGuard';
import { SolicitudSIUudummyuPreexistenciasComponent } from './siu_dummy_preexistencias.component';
import { SolicitudSIUudummyuDiferenciasLiqComponent } from './siu_dummy_diferenciasliq.component';
import { SolicitudSIUuTCREARSEGUNDAFIRMAComponent } from './siu_tcrearsegundafirma.component';
import { SolicitudSIUuTENVIARDOCComponent } from './siu_tenviardoc.component';
import { SolicitudIIUuDiferenciasLiquidacionComponent } from './iiu_diferenciasliquidacion.component';
import { SolicitudMDIUuSolicitudPreexistenciasComponent } from './mdiu_solicitudpreexistencias.component';
import { SolicitudPIUuRadicadosuObsComponent } from './piu_radicados_obs.component';
import { SolicitudPIUuEnvioDocComponent } from './piu_enviodoc.component';

const routes: Routes = [
    { path: 'siu_dummy_preexistencias' , component: SolicitudSIUudummyuPreexistenciasComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'siu_dummy_diferenciasliq' , component: SolicitudSIUudummyuDiferenciasLiqComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'siu_tcrearsegundafirma' , component: SolicitudSIUuTCREARSEGUNDAFIRMAComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'siu_tenviardoc' , component: SolicitudSIUuTENVIARDOCComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'iiu_diferenciasliquidacion' , component: SolicitudIIUuDiferenciasLiquidacionComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'mdiu_solicitudpreexistencias' , component: SolicitudMDIUuSolicitudPreexistenciasComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'piu_radicados_obs' , component: SolicitudPIUuRadicadosuObsComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'piu_enviodoc' , component: SolicitudPIUuEnvioDocComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
