import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'URL_SUPABASE', 
      'CLAVE_PUBLICA_SUPABASE' 
    );
  }

 
  getSupabaseClient() {
    return this.supabase;
  }
}