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
  nuevoMunicipio = {
    nombre: '',
    departamento_id: null,
  };

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadMunicipios();
  }

  async loadMunicipios() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('municipios')
      .select('*');
    if (error) console.error('Error al cargar municipios:', error);
    else this.municipios = data || [];
  }

  async addMunicipio() {
    if (!this.nuevoMunicipio.nombre || !this.nuevoMunicipio.departamento_id) return;
    const { data, error } = await this.supabase
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
}