import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async login() {
    try {
      // Inicia sesión con Supabase
      const response = await this.supabaseService.signIn(this.email, this.password);

      if (!response || !response.user) {
        alert('No se pudo iniciar sesión. Verifica tus credenciales.');
        return;
      }

      // Obtiene el perfil del usuario
      const profile = await this.supabaseService.getProfile(response.user.id);

      if (!profile) {
        alert('Perfil no encontrado. Contacta al administrador.');
        return;
      }

      // Redirige según el rol
      if (profile.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else if (profile.role === 'user') {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Rol no válido. Contacta al administrador.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      alert('Ocurrió un error durante el login. Intenta nuevamente.');
    }
  }
}
