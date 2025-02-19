import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  showToast = false;
  constructor(private supabase: SupabaseService,private router: Router) {}

  async ngOnInit() {
    await this.loadPaises();
  }
  regresarAlDashboard() {
    this.router.navigate(['/dashboard']); // Redirige al Dashboard
  }
  mostrarToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Ocultar el toast después de 3 segundos
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
      this.mostrarToast();
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
