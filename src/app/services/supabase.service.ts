import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://bljhyxvmvcaczcsniqrx.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamh5eHZtdmNhY3pjc25pcXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MjMzMDcsImV4cCI6MjA1NTM5OTMwN30.k9LY8aD5OlvRMHTyrsEZrWS812Aru3HkoR10HDV9Sos' 
    );
  }

 
  getSupabaseClient() {
    return this.supabase;
  }
}