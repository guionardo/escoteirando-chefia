import { ILoginResponse } from '../responses';

export interface IAuthorization extends ILoginResponse{
  auth: string;
  validUntil: Date;
}

export interface IEscotista {
  codigo: number;
  codigoAssociado: number;
  username: string;
  nomeCompleto: string;
  ativo: string;
  codigoGrupo: number;
  codigoRegiao: string;
  codigoFoto: number | undefined;
}

export interface IGrupo {
  codigo: number;
  codigoRegiao: string;
  nome: string;
  codigoModalidade: number;
}

export interface ISecao {
  codigo: number;
  nome: string;
  codigoTipoSecao: number;
  codigoGrupo: number;
  codigoRegiao: string;
}

