import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css'],
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: any[] = [];
  nuevoColaborador = {
    nombre_completo: '',
    edad: null,
    telefono: '',
    email: '',
    empresa_id: null,
  };
  errorMessage: string | null = null;

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadColaboradores();
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

  async addColaborador() {
    if (
      !this.nuevoColaborador.nombre_completo ||
      !this.nuevoColaborador.edad ||
      !this.nuevoColaborador.telefono ||
      !this.nuevoColaborador.email ||
      !this.nuevoColaborador.empresa_id
    ) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('colaboradores')
      .insert([this.nuevoColaborador]);

    if (error) {
      console.error('Error al agregar colaborador:', error);
      this.errorMessage = 'Error al agregar colaborador. Verifica los datos.';
    } else {
      this.nuevoColaborador = {
        nombre_completo: '',
        edad: null,
        telefono: '',
        email: '',
        empresa_id: null,
      };
      this.errorMessage = null;
      await this.loadColaboradores();
    }
  }

  async deleteColaborador(id: number) {
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('colaboradores')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error al eliminar colaborador:', error);
      this.errorMessage = 'Error al eliminar colaborador.';
    } else {
      await this.loadColaboradores();
    }
  }
}