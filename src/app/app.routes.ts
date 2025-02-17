import { Routes } from '@angular/router';
import { PaisesComponent } from './components/paises/paises.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { MunicipiosComponent } from './components/municipios/municipios.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';

export const routes: Routes = [
  { path: 'paises', component: PaisesComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'municipios', component: MunicipiosComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: '', redirectTo: '/paises', pathMatch: 'full' },
];