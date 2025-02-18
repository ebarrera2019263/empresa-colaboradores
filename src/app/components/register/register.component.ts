import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  nombre: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async register() {
    try {
      const response = await this.supabaseService.signUp(this.email, this.password);

      if (!response || !response.user) {
        alert('No se pudo registrar el usuario.');
        return;
      }

      await this.supabaseService.insertProfile(response.user.id, this.email, this.nombre, 'admin');

      alert('Usuario registrado correctamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Ocurrió un error durante el registro');
    }
  }
}
