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

// Define las rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

// Configura la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(FormsModule), // Importa FormsModule
    SupabaseService,
    AuthGuard,
  ],
}).catch(err => console.error(err));