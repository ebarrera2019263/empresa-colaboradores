import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Ruta por defecto
];