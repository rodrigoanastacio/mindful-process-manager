interface BaseProcess {
  id: string;
  numero_processo: string;
  titulo: string;
  descricao: string;
  status: string;
  data_criacao: string;
  updated_at: string;
  prazo: string;
  prioridade: string;
  tipo: string;
  departamento: {
    nome: string;
  };
  departamento_id: string;
  advogado_responsavel: {
    nome_completo: string;
  };
  advogado_responsavel_id: string;
  cliente_telefone?: string;
  arquivos_relacionados: null | any[];
}

export type { BaseProcess };