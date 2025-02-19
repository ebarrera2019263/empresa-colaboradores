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
  paises: any[] = []; 
  nuevoPais: string = ''; 
  isModalOpen = false; 
  paisEditando: any = null; 

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadPaises();
  }

  async loadPaises() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('paises')
      .select('*');
    if (error) console.error(error);
    else this.paises = data || [];
  }

  async addPais() {
    if (!this.nuevoPais) return;
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('paises')
      .insert([{ nombre: this.nuevoPais }]);
    if (error) console.error(error);
    else {
      this.nuevoPais = '';
      await this.loadPaises();
    }
  }

  async deletePais(id: number) {
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('paises')
      .delete()
      .eq('id', id);
    if (error) console.error(error);
    else await this.loadPaises();
  }

  openModal(pais: any) {
    this.paisEditando = { ...pais };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.paisEditando = null;
  }

  async editPais() {
    if (!this.paisEditando.nombre) return;
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('paises')
      .update({ nombre: this.paisEditando.nombre })
      .eq('id', this.paisEditando.id);

    if (error) console.error('Error al actualizar país:', error);
    else {
      this.closeModal();
      await this.loadPaises();
    }
  }
}
