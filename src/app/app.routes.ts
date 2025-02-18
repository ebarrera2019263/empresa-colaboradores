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
  { path: 'empresas', component: EmpresasComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
