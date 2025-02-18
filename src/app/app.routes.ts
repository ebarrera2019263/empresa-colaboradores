import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { MunicipiosComponent } from './components/municipios/municipios.component';
import { PaisesComponent } from './components/paises/paises.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'paises', component: PaisesComponent, canActivate: [AuthGuard] },
  { path: 'departamentos', component: DepartamentosComponent, canActivate: [AuthGuard] },
  { path: 'municipios', component: MunicipiosComponent, canActivate: [AuthGuard] },
  { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard] },
  { path: 'colaboradores', component: ColaboradoresComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
