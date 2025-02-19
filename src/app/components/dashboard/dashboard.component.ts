import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empresas: any[] = [];
  colaboradores: any[] = [];
  empresasFiltradas: any[] = [];
  colaboradoresFiltrados: any[] = [];
  searchEmpresa: string = ''; 
  searchColaborador: string = ''; 
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
      this.empresasFiltradas = [...this.empresas]; 
      this.errorMessage = null;
    }
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
      this.colaboradoresFiltrados = [...this.colaboradores]; 
      this.errorMessage = null;
    }
  }

  filtrarEmpresas() {
    if (!this.searchEmpresa.trim()) {
      this.empresasFiltradas = [...this.empresas];
    }

    this.empresasFiltradas = this.empresas.filter(empresa =>
      empresa.nombre_comercial.toLowerCase().includes(this.searchEmpresa.toLowerCase())
    );
  }

  filtrarColaboradores() {
    if (!this.searchColaborador.trim()) {
      this.colaboradoresFiltrados = [...this.colaboradores]; 
      return;
    }

    this.colaboradoresFiltrados = this.colaboradores.filter(colaborador =>
      colaborador.nombre_completo.toLowerCase().includes(this.searchColaborador.toLowerCase())
    );
  }
}
