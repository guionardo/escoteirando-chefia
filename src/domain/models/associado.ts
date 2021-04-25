export default class Associado {
  codigo: number;
  codigoAssociado: number;
  username: string;
  nomeCompleto: string;
  ativo: string;
  codigoGrupo: number;
  codigoRegiao: string;
  codigoFoto: number;

  constructor(payload: {
    codigo: number;
    codigoAssociado: number;
    username: string;
    nomeCompleto: string;
    ativo: string;
    codigoGrupo: number;
    codigoRegiao: string;
    codigoFoto: number;
  }) {
    this.codigo = payload.codigo;
    this.codigoAssociado = payload.codigoAssociado;
    this.username = payload.username;
    this.nomeCompleto = payload.nomeCompleto;
    this.ativo = payload.ativo;
    this.codigoGrupo = payload.codigoGrupo;
    this.codigoRegiao = payload.codigoRegiao;
    this.codigoFoto = payload.codigoFoto;
  }
}
