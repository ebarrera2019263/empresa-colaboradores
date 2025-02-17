import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
})
export class DepartamentosComponent implements OnInit {
  departamentos: any[] = [];
  nuevoDepartamento = {
    nombre: '',
    pais_id: null,
  };

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadDepartamentos();
  }

  async loadDepartamentos() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('departamentos')
      .select('*');
    if (error) console.error('Error al cargar departamentos:', error);
    else this.departamentos = data || [];
  }

  async addDepartamento() {
    if (!this.nuevoDepartamento.nombre || !this.nuevoDepartamento.pais_id) return;
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('departamentos')
      .insert([this.nuevoDepartamento]);
    if (error) console.error('Error al agregar departamento:', error);
    else {
      this.nuevoDepartamento = { nombre: '', pais_id: null };
      await this.loadDepartamentos();
    }
  }

  async deleteDepartamento(id: number) {
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('departamentos')
      .delete()
      .eq('id', id);
    if (error) console.error('Error al eliminar departamento:', error);
    else await this.loadDepartamentos();
  }
}