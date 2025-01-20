export type ProcessType = 'administrativo' | 'judicial';
export type ProcessStatus = 'em_andamento' | 'concluido' | 'arquivado';
export type ProcessPriority = 'alta' | 'media' | 'baixa';
export type UserPermission = 'administrador' | 'usuario_comum';

export interface Process {
  id: string;
  numero_processo: string;
  titulo: string;
  descricao: string | null;
  tipo: ProcessType;
  status: ProcessStatus;
  prioridade: ProcessPriority;
  advogado_responsavel_id: string | null;
  departamento_id: string | null;
  arquivos_relacionados: string[] | null;
  data_criacao: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  permissao: UserPermission;
  created_at: string;
  updated_at: string;
}

export interface LegalPartner {
  id: string;
  nome_completo: string;
  email: string;
  telefone: string | null;
  especializacao: string | null;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  nome: string;
  descricao: string | null;
  data_criacao: string;
  created_at: string;
  updated_at: string;
}

export interface Log {
  id: string;
  processo_id: string | null;
  acao: string;
  usuario_id: string | null;
  data_hora: string;
  created_at: string;
}