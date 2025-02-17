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
    if (error) console.error('Error al cargar empresas:', error);
    else this.empresas = data || [];
  }

  async loadColaboradores() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('colaboradores')
      .select('*');
    if (error) console.error('Error al cargar colaboradores:', error);
    else this.colaboradores = data || [];
  }
}