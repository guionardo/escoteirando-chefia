import { ILoginResponse } from '../responses';

export interface IAuthorization extends ILoginResponse {
  auth: string;
  validUntil: Date;
}

export interface ILoginRequest {
  username: string;
  password: string;
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
  SubSecoes?: ISubSecao[]
}

export interface ISubSecao {
  codigo: number
  nome: string
  codigoSecao: number
  codigoLider: number
  codigoViceLider: number
  associados: Array<IAssociado>
}

export interface IAssociado {
  codigo: number
  nome: string
  codigoFoto?: number
  codigoEquipe?: number
  username: number
  numeroDigito: number
  dataNascimento: Date
  dataValidade: Date
  nomeAbreviado: string
  sexo: string
  codigoRamo: number
  codigoCategoria: number
  codigoSegundaCategoria: number
  codigoTerceiraCategoria: number
  linhaFormacao?: string
  codigoRamoAdulto?: number
  dataAcompanhamento?: Date
}

export interface IMarcacao {
  codigoAtividade: number
  codigoAssociado: number
  dataAtividade: Date
  dataStatusJovem?: Date
  dataStatusEscotista?: Date
  statusJovem?: string
  statusEscotista?: string
  dataHoraAtualizacao: Date
  codigoUltimoEscotista?: number
  segmento: string
}

export interface IMarcacoes {
  dataHora: Date
  value: IMarcacao[]
}

export interface IProgressao {
  codigo: number
  descricao: string
  codigoUeb: string
  ordenacao: number
  codigoCaminho: number
  codigoDesenvolvimento?: number
  numeroGrupo?: number
  codigoRegiao?: string
  codigoCompetencia?: number
  segmento?: string
  areaDesenvolvimento?: string
}