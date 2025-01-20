export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      advogados_parceiros: {
        Row: {
          created_at: string
          email: string
          especializacao: string | null
          id: string
          nome_completo: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          especializacao?: string | null
          id?: string
          nome_completo: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          especializacao?: string | null
          id?: string
          nome_completo?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      departamentos: {
        Row: {
          created_at: string
          data_criacao: string
          descricao: string | null
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_criacao?: string
          descricao?: string | null
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_criacao?: string
          descricao?: string | null
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      logs: {
        Row: {
          acao: string
          created_at: string
          data_hora: string
          id: string
          processo_id: string | null
          usuario_id: string | null
        }
        Insert: {
          acao: string
          created_at?: string
          data_hora?: string
          id?: string
          processo_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          acao?: string
          created_at?: string
          data_hora?: string
          id?: string
          processo_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_processo_id_fkey"
            columns: ["processo_id"]
            isOneToOne: false
            referencedRelation: "processos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logs_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      processos: {
        Row: {
          advogado_responsavel_id: string | null
          arquivos_relacionados: string[] | null
          created_at: string
          data_criacao: string
          departamento_id: string | null
          descricao: string | null
          id: string
          numero_processo: string
          prioridade: Database["public"]["Enums"]["processo_prioridade"]
          status: Database["public"]["Enums"]["processo_status"]
          tipo: Database["public"]["Enums"]["processo_tipo"]
          titulo: string
          updated_at: string
        }
        Insert: {
          advogado_responsavel_id?: string | null
          arquivos_relacionados?: string[] | null
          created_at?: string
          data_criacao?: string
          departamento_id?: string | null
          descricao?: string | null
          id?: string
          numero_processo: string
          prioridade?: Database["public"]["Enums"]["processo_prioridade"]
          status?: Database["public"]["Enums"]["processo_status"]
          tipo: Database["public"]["Enums"]["processo_tipo"]
          titulo: string
          updated_at?: string
        }
        Update: {
          advogado_responsavel_id?: string | null
          arquivos_relacionados?: string[] | null
          created_at?: string
          data_criacao?: string
          departamento_id?: string | null
          descricao?: string | null
          id?: string
          numero_processo?: string
          prioridade?: Database["public"]["Enums"]["processo_prioridade"]
          status?: Database["public"]["Enums"]["processo_status"]
          tipo?: Database["public"]["Enums"]["processo_tipo"]
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "processos_advogado_responsavel_id_fkey"
            columns: ["advogado_responsavel_id"]
            isOneToOne: false
            referencedRelation: "advogados_parceiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "processos_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          created_at: string
          email: string
          id: string
          nome: string
          permissao: Database["public"]["Enums"]["usuario_permissao"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nome: string
          permissao?: Database["public"]["Enums"]["usuario_permissao"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome?: string
          permissao?: Database["public"]["Enums"]["usuario_permissao"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      processo_prioridade: "alta" | "media" | "baixa"
      processo_status: "em_andamento" | "concluido" | "arquivado"
      processo_tipo: "administrativo" | "judicial"
      usuario_permissao: "administrador" | "usuario_comum"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
