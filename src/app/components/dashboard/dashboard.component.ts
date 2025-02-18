import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empresas: any[] = [];
  colaboradores: any[] = [];
  errorMessage: string | null = null;

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadEmpresas();
    await this.loadColaboradores();
  }

  async loadEmpresas() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('empresas')
      .select('*');
    if (error) {
      console.error('Error al cargar empresas:', error);
      this.errorMessage = 'Error al cargar empresas.';
    } else {
      this.empresas = data || [];
      this.errorMessage = null;

    }
    console.log(this.empresas);
  }

  async loadColaboradores() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('colaboradores')
      .select('*');
    if (error) {
      console.error('Error al cargar colaboradores:', error);
      this.errorMessage = 'Error al cargar colaboradores.';
    } else {
      this.colaboradores = data || [];
      this.errorMessage = null;
    }
  }
}
