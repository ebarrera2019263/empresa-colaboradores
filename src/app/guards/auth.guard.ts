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
    const { data: { session } } = await this.supabaseService
      .getSupabaseClient()
      .auth.getSession();

    if (!session) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
