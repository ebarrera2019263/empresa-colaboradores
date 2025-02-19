import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
})
export class DepartamentosComponent implements OnInit {
  departamentos: any[] = [];
  paises: any[] = [];
  nuevoDepartamento = { nombre: '', pais_id: null };
  isModalOpen = false; 
  departamentoEditando: any = null; 

  constructor(private supabase: SupabaseService ,private router: Router) {}

  async ngOnInit() {
    await this.loadDepartamentos();
    await this.loadPaises();
  }

  async loadDepartamentos() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('departamentos')
      .select('*');
    if (error) console.error('Error al cargar departamentos:', error);
    else this.departamentos = data || [];
  }

  async loadPaises() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('paises')
      .select('id, nombre');
    if (error) console.error('Error al cargar países:', error);
    else this.paises = data || [];
  }

  async addDepartamento() {
    if (!this.nuevoDepartamento.nombre || !this.nuevoDepartamento.pais_id) return;
    const { error } = await this.supabase
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

  getNombrePais(pais_id: number): string {
    const pais = this.paises.find(p => p.id === pais_id);
    return pais ? pais.nombre : 'Desconocido';
  }


  openModal(departamento: any) {
    this.departamentoEditando = { ...departamento };
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
    this.departamentoEditando = null;
  }

  regresarAlDashboard() {
    this.router.navigate(['/dashboard']); // Redirige al Dashboard
  }
  async editDepartamento() {
    if (!this.departamentoEditando.nombre || !this.departamentoEditando.pais_id) return;
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('departamentos')
      .update({
        nombre: this.departamentoEditando.nombre,
        pais_id: this.departamentoEditando.pais_id,
      })
      .eq('id', this.departamentoEditando.id);
    
    if (error) console.error('Error al actualizar departamento:', error);
    else {
      this.closeModal();
      await this.loadDepartamentos();
    }
  }
}
