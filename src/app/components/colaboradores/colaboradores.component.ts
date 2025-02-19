import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css'],
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: any[] = [];
  empresas: any[] = [];
  nuevoColaborador = {
    nombre_completo: '',
    edad: null,
    telefono: '',
    email: '',
    empresa_id: null,
  };
  isModalOpen = false;
  colaboradorEditando: any = null;

  constructor(private supabase: SupabaseService,  private router: Router) {}

  async ngOnInit() {
    await this.loadColaboradores();
    await this.loadEmpresas();
  }

  async loadColaboradores() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('colaboradores')
      .select('*');
    if (error) console.error('Error al cargar colaboradores:', error);
    else this.colaboradores = data || [];
  }
  regresarAlDashboard() {
    this.router.navigate(['/dashboard']); // Redirige al Dashboard
  }

  

  async loadEmpresas() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('empresas')
      .select('id, nombre_comercial');
    if (error) console.error('Error al cargar empresas:', error);
    else this.empresas = data || [];
  }

  async addColaborador() {
    if (
      !this.nuevoColaborador.nombre_completo ||
      !this.nuevoColaborador.edad ||
      !this.nuevoColaborador.telefono ||
      !this.nuevoColaborador.email ||
      !this.nuevoColaborador.empresa_id
    ) return;

    const { error } = await this.supabase
      .getSupabaseClient()
      .from('colaboradores')
      .insert([this.nuevoColaborador]);

    if (error) console.error('Error al agregar colaborador:', error);
    else {
      this.nuevoColaborador = {
        nombre_completo: '',
        edad: null,
        telefono: '',
        email: '',
        empresa_id: null,
      };
      await this.loadColaboradores();
    }
  }

  async deleteColaborador(id: number) {
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('colaboradores')
      .delete()
      .eq('id', id);
    if (error) console.error('Error al eliminar colaborador:', error);
    else await this.loadColaboradores();
  }

  getNombreEmpresa(empresa_id: number): string {
    const empresa = this.empresas.find(e => e.id === empresa_id);
    return empresa ? empresa.nombre_comercial : 'Desconocida';
  }

  openModal(colaborador: any) {
    console.log('Abriendo modal para:', colaborador);
    this.colaboradorEditando = { ...colaborador };
    this.isModalOpen = true;
  }
  

  closeModal() {
    this.isModalOpen = false;
    this.colaboradorEditando = null;
  }

  async editColaborador() {
    if (
      !this.colaboradorEditando.nombre_completo ||
      !this.colaboradorEditando.edad ||
      !this.colaboradorEditando.telefono ||
      !this.colaboradorEditando.email ||
      !this.colaboradorEditando.empresa_id
    ) return;

    const { error } = await this.supabase
      .getSupabaseClient()
      .from('colaboradores')
      .update({
        nombre_completo: this.colaboradorEditando.nombre_completo,
        edad: this.colaboradorEditando.edad,
        telefono: this.colaboradorEditando.telefono,
        email: this.colaboradorEditando.email,
        empresa_id: this.colaboradorEditando.empresa_id,
      })
      .eq('id', this.colaboradorEditando.id);

    if (error) console.error('Error al actualizar colaborador:', error);
    else {
      this.closeModal();
      await this.loadColaboradores();
    }
  }
}
