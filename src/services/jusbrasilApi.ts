import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jusbrasil.com.br',
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
    const response = await api.get(`/v1/processes/${processNumber}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar processo:', error);
    return null;
  }
};