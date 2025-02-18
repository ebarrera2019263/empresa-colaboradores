import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css'],
})
export class PaisesComponent implements OnInit {
  paises: any[] = []; // Lista de países
  nuevoPais: string = ''; // Variable para el nuevo país

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadPaises(); // Cargar países al iniciar
  }

  // Cargar la lista de países desde Supabase
  async loadPaises() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('paises')
      .select('*');
    if (error) console.error(error);
    else this.paises = data || [];
  }

  // Agregar un nuevo país
  async addPais() {
    if (!this.nuevoPais) return; // Validar que el campo no esté vacío
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('paises')
      .insert([{ nombre: this.nuevoPais }]);
    if (error) console.error(error);
    else {
      this.nuevoPais = ''; // Limpiar el campo de entrada
      await this.loadPaises(); // Recargar la lista de países
    }
  }

  // Eliminar un país
  async deletePais(id: number) {
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('paises')
      .delete()
      .eq('id', id);
    if (error) console.error(error);
    else await this.loadPaises(); // Recargar la lista de países
  }
}