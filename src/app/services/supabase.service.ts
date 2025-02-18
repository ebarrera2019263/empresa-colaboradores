import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://bljhyxvmvcaczcsniqrx.supabase.co', // URL de Supabase
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamh5eHZtdmNhY3pjc25pcXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MjMzMDcsImV4cCI6MjA1NTM5OTMwN30.k9LY8aD5OlvRMHTyrsEZrWS812Aru3HkoR10HDV9Sos' // Clave pública
    );
  }

  // Obtener el cliente de Supabase
  getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }

  // 🔹 Método corregido para iniciar sesión (ANTES usabas signUp)
  async signIn(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;
    return data;
  }

  // 🔹 Método corregido para obtener perfil con mejor manejo de errores
  async getProfile(userId: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // Evita error si no hay filas

    if (error) throw error;
    if (!data) {
      console.warn('Perfil no encontrado para el usuario:', userId);
      return null;
    }
    return data;
  }

  // 🔹 Método corregido para registrar usuario con perfil automáticamente
  async signUp(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;

    if (!data?.user) {
      throw new Error('No se pudo crear el usuario.');
    }

    // Inserta el perfil en la tabla 'profiles'
    await this.insertProfile(data.user.id, email, 'Nombre por defecto', 'user');

    return data;
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  // 🔹 Método para insertar perfil en la tabla profiles
  async insertProfile(userId: string, email: string, nombre: string, role: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('profiles')
      .insert([{ id: userId, email, nombre, role }]);

    if (error) throw error;
    return data;
  }
}
