import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  empresas: any[] = [];
  municipios: any[] = [];
  showToast = false;
  nuevaEmpresa = {
    nit: '',
    razon_social: '',
    nombre_comercial: '',
    telefono: '',
    email: '',
    municipio_id: null,
  };
  isModalOpen = false;
  empresaEditando: any = null;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    await this.loadEmpresas();
    await this.loadMunicipios();
  }
  mostrarToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Ocultar el toast después de 3 segundos
  }

  async loadEmpresas() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('empresas')
      .select('*');
    if (error) console.error('Error al cargar empresas:', error);
    else this.empresas = data || [];
  }

  async loadMunicipios() {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from('municipios')
      .select('id, nombre');
    if (error) console.error('Error al cargar municipios:', error);
    else this.municipios = data || [];
  }

  async addEmpresa() {
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('empresas')
      .insert([this.nuevaEmpresa]);
  
    if (error) {
      console.error('Error al agregar empresa:', error);
    } else {
      this.nuevaEmpresa = {
        nit: '',
        razon_social: '',
        nombre_comercial: '',
        telefono: '',
        email: '',
        municipio_id: null,
      };
      await this.loadEmpresas();
      this.mostrarToast(); // Activar el toast después de agregar
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

  getNombreMunicipio(municipio_id: number): string {
    const municipio = this.municipios.find(m => m.id === municipio_id);
    return municipio ? municipio.nombre : 'Desconocido';
  }

  openModal(empresa: any) {
    this.empresaEditando = { ...empresa };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.empresaEditando = null;
  }

  regresarAlDashboard() {
    this.router.navigate(['/dashboard']); // Redirige al Dashboard
  }

  async editEmpresa() {
    if (!this.empresaEditando.nombre_comercial || !this.empresaEditando.municipio_id) return;
    const { error } = await this.supabase
      .getSupabaseClient()
      .from('empresas')
      .update({
        nit: this.empresaEditando.nit,
        razon_social: this.empresaEditando.razon_social,
        nombre_comercial: this.empresaEditando.nombre_comercial,
        telefono: this.empresaEditando.telefono,
        email: this.empresaEditando.email,
        municipio_id: this.empresaEditando.municipio_id,
      })
      .eq('id', this.empresaEditando.id);

    if (error) console.error('Error al actualizar empresa:', error);
    else {
      this.closeModal();
      await this.loadEmpresas();
    }
  }
}
