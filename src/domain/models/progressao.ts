import { IProgressao } from './interfaces';

export const AreasDesenvolvimento = [
    'Físico',
    'Intelectual',
    'Caráter',
    'Afetivo',
    'Social',
    'Espiritual'
]

const ErroArea = 'ERRO NA ÁREA DE DESENVOLVIMENTO'

export class Progressao implements IProgressao {
    codigo: number;
    descricao: string;
    codigoUeb: string;
    ordenacao: number;
    codigoCaminho: number;
    codigoDesenvolvimento?: number | undefined;
    numeroGrupo?: number | undefined;
    codigoRegiao?: string | undefined;
    codigoCompetencia?: number | undefined;
    segmento?: string | undefined;
    areaDesenvolvimento?: string | undefined;

    constructor(progressao: IProgressao) {
        this.codigo = progressao.codigo
        this.descricao = progressao.descricao
        this.codigoUeb = progressao.codigoUeb
        this.ordenacao = progressao.ordenacao
        this.codigoCaminho = progressao.codigoCaminho
        this.codigoDesenvolvimento = progressao.codigoDesenvolvimento
        this.numeroGrupo = progressao.numeroGrupo
        this.codigoRegiao = progressao.codigoRegiao
        this.codigoCompetencia = progressao.codigoCompetencia
        this.segmento = progressao.segmento
        if (progressao.areaDesenvolvimento) {
            this.areaDesenvolvimento = progressao.areaDesenvolvimento
        } else {
            const codigoArea = !!this.codigoUeb ? this.codigoUeb.substr(0, 1) : 'X'
            const area = AreasDesenvolvimento.find(a => a.startsWith(codigoArea)) || ErroArea
            this.areaDesenvolvimento = area
        }
    }
}