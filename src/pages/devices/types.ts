export interface Brand {
    id?: number;
    nome: string;
  }
  
  export interface Model {
    id?: number;
    nome: string;
    marcaId: number;
  }
  
  export interface Location {
    id?: number;
    nome: string;
  }
  
  export interface Device {
    id?: number;
    modeloId: number;
    localizacaoId: number;
    marcaId: number;
    ip: string;
    porta?: number;
    url?: string;
  }
  