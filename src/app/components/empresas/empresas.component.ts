import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  empresas: any[] = [];
  nuevaEmpresa = {
    nit: '',
    razon_social: '',
    nombre_comercial: '',
    telefono: '',
    email: '',
    municipio_id: null,
  };

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadEmpresas();
  }

  async loadEmpresas() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('empresas')
      .select('*');
    if (error) console.error('Error al cargar empresas:', error);
    else this.empresas = data || [];
  }

  async addEmpresa() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('empresas')
      .insert([this.nuevaEmpresa]);
    if (error) console.error('Error al agregar empresa:', error);
    else {
      this.nuevaEmpresa = {
        nit: '',
        razon_social: '',
        nombre_comercial: '',
        telefono: '',
        email: '',
        municipio_id: null,
      };
      await this.loadEmpresas();
    }
  }

  async deleteEmpresa(id: number) {
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('empresas')
      .delete()
      .eq('id', id);
    if (error) console.error('Error al eliminar empresa:', error);
    else await this.loadEmpresas();
  }
}