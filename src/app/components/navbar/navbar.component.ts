import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async logout() {
    console.log('Cerrando sesión...');
    await this.supabaseService.logout();
    this.router.navigate(['/login']);
  }
}
