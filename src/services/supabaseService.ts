import { supabase } from "@/integrations/supabase/client";
import { Process, Department, LegalPartner, Log } from "@/types/database";

export const processService = {
  async getAll() {
    const { data, error } = await supabase
      .from('processos')
      .select(`
        *,
        advogado_responsavel:advogados_parceiros(nome_completo),
        departamento:departamentos(nome)
      `);

    if (error) throw error;
    return data;
  },

  async create(process: Omit<Process, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('processos')
      .insert(process)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, process: Partial<Process>) {
    const { data, error } = await supabase
      .from('processos')
      .update(process)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('processos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

export const departmentService = {
  async getAll() {
    const { data, error } = await supabase
      .from('departamentos')
      .select('*');

    if (error) throw error;
    return data;
  }
};

export const legalPartnerService = {
  async getAll() {
    const { data, error } = await supabase
      .from('advogados_parceiros')
      .select('*');

    if (error) throw error;
    return data;
  }
};

export const logService = {
  async create(log: Omit<Log, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('logs')
      .insert(log)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getByProcess(processId: string) {
    const { data, error } = await supabase
      .from('logs')
      .select(`
        *,
        usuario:usuarios(nome)
      `)
      .eq('processo_id', processId)
      .order('data_hora', { ascending: false });

    if (error) throw error;
    return data;
  }
};