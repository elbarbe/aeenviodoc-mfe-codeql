import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopStateNavigationGuard } from '../common/popStateNavigationGuard';
import { LoginGuard } from '../common/loginGuard';
import { GSSIUuOGETREPORTEComponent } from './siu_ogetreporte.component';
import { GSSIUuOGETREPORTEuOutComponent } from './siu_ogetreporte_out.component';

const routes: Routes = [
    { path: 'siu_ogetreporte' , component: GSSIUuOGETREPORTEComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'siu_ogetreporte_out' , component: GSSIUuOGETREPORTEuOutComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalServicesRoutingModule { }
