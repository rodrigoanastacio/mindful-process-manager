import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jusbrasil.com.br',
});

// Interceptor para adicionar a chave de API em todas as requisições
api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('jusbrasil_api_key');
  if (apiKey) {
    config.headers['Authorization'] = `Bearer ${apiKey}`;
  }
  return config;
});

export interface ProcessUpdate {
  date: string;
  content: string;
  court: string;
  type: string;
}

export interface ProcessDetails {
  cnj: string;
  court: string;
  updates: ProcessUpdate[];
  parties: {
    active: string[];
    passive: string[];
  };
  subject: string;
  distributionDate: string;
}

export const searchProcess = async (processNumber: string): Promise<ProcessDetails | null> => {
  try {
    const apiKey = localStorage.getItem('jusbrasil_api_key');
    if (!apiKey) {
      throw new Error('Chave de API não encontrada');
    }

    const response = await api.get(`/v1/processes/${processNumber}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar processo:', error);
    return null;
  }
};