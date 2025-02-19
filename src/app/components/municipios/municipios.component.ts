import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-municipios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css'],
})
export class MunicipiosComponent implements OnInit {
  municipios: any[] = [];
  departamentos: any[] = [];
  nuevoMunicipio = {
    nombre: '',
    departamento_id: null,
  };
  isModalOpen = false;
  municipioEditando: any = null;

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadMunicipios();
    await this.loadDepartamentos();
  }

  async loadMunicipios() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('municipios')
      .select('*');
    if (error) console.error('Error al cargar municipios:', error);
    else this.municipios = data || [];
  }

  async loadDepartamentos() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('departamentos')
      .select('id, nombre');
    if (error) console.error('Error al cargar departamentos:', error);
    else this.departamentos = data || [];
  }

  async addMunicipio() {
    if (!this.nuevoMunicipio.nombre || !this.nuevoMunicipio.departamento_id) return;
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('municipios')
      .insert([this.nuevoMunicipio]);
    if (error) console.error('Error al agregar municipio:', error);
    else {
      this.nuevoMunicipio = { nombre: '', departamento_id: null };
      await this.loadMunicipios();
    }
  }

  async deleteMunicipio(id: number) {
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('municipios')
      .delete()
      .eq('id', id);
    if (error) console.error('Error al eliminar municipio:', error);
    else await this.loadMunicipios();
  }

  getNombreDepartamento(departamento_id: number): string {
    const depto = this.departamentos.find(d => d.id === departamento_id);
    return depto ? depto.nombre : 'Desconocido';
  }

  openModal(municipio: any) {
    this.municipioEditando = { ...municipio };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.municipioEditando = null;
  }

  async editMunicipio() {
    if (!this.municipioEditando.nombre || !this.municipioEditando.departamento_id) return;
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('municipios')
      .update({
        nombre: this.municipioEditando.nombre,
        departamento_id: this.municipioEditando.departamento_id,
      })
      .eq('id', this.municipioEditando.id);

    if (error) console.error('Error al actualizar municipio:', error);
    else {
      this.closeModal();
      await this.loadMunicipios();
    }
  }
}
