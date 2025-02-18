import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      // Verificar si hay una sesión activa
      const { data: sessionData, error } = await this.supabaseService
        .getSupabaseClient()
        .auth.getSession();

      if (error || !sessionData?.session?.user) {
        console.warn('No hay sesión activa, redirigiendo al login...');
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error en AuthGuard:', err);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
