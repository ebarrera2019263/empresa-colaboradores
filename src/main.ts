import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { RegisterComponent } from './app/components/register/register.component';
import { SupabaseService } from './app/services/supabase.service';
import { AuthGuard } from './app/guards/auth.guard';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpresasComponent } from './app/components/empresas/empresas.component';
import { DepartamentosComponent } from './app/components/departamentos/departamentos.component';
import { MunicipiosComponent } from './app/components/municipios/municipios.component';
import { PaisesComponent } from './app/components/paises/paises.component';
import { ColaboradoresComponent } from './app/components/colaboradores/colaboradores.component';

// Define las rutas
const routes: Routes = [
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

// Configura la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // 🔹 Asegurar que el router es el primer provider
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(FormsModule),
    SupabaseService,
    AuthGuard,
  ],
}).catch(err => console.error(err));
