import { supabase } from "@/integrations/supabase/client";

interface LegalPartner {
  id?: string;
  nome_completo: string;
  email: string;
  especializacao: string | null;
  telefone: string | null;
  created_at?: string;
  updated_at?: string;
}

export const legalPartnerService = {
  async getAll() {
    const { data, error } = await supabase
      .from('advogados_parceiros')
      .select('*')
      .order('nome_completo');

    if (error) {
      console.error('Erro ao buscar advogados:', error);
      throw error;
    }

    return data;
  },

  async create(partner: Omit<LegalPartner, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('advogados_parceiros')
      .insert(partner)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar advogado:', error);
      throw error;
    }

    return data;
  },

  async update(id: string, partner: Partial<LegalPartner>) {
    const { data, error } = await supabase
      .from('advogados_parceiros')
      .update(partner)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar advogado:', error);
      throw error;
    }

    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('advogados_parceiros')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir advogado:', error);
      throw error;
    }
  }
};