import { LocalStorage } from 'quasar';
import Authorization from 'src/domain/models/authorization';
import {
  IAuthorization,
  IEscotista,
  IGrupo,
  IMarcacoes,
  IProgressao,
  ISecao,
  ISubSecao
} from 'src/domain/models/interfaces';
import { Logger } from './logger';
import { dateAgeInSeconds } from './tools_service';

const ESCOTISTA = 'MAPPA_ESCOTISTA';
const LOGIN = 'MAPPA_LOGIN';
const GRUPO = 'MAPPA_GRUPO';
const SECOES = 'MAPPA_SECOES';
const SUBSECOES = 'MAPPA_SUBSECOES';
const FOTO = 'MAPPA_FOTO'
const MARCACOES = 'MAPPA_MARCACOES'
const PROGRESSOES = 'MAPPA_PROGRESSOES'

const logger = new Logger('StorageService');

/**
 * Returns valid authorization from LocalStorage
 * @returns
 */
export function getAuth (): IAuthorization | null {
  let auth = LocalStorage.getItem(LOGIN) as IAuthorization;

  logger.logDebug('getAuth', auth);
  if (auth) {
    auth = new Authorization(auth);
    if (auth && auth.validUntil > new Date()) {
      return auth;
    }
  }
  return null;
}

export function setAuth (auth: IAuthorization): void {
  logger.logDebug('setAuth', auth)
  LocalStorage.set(LOGIN, auth);
}
export function getEscotista (userId: number): IEscotista | null {
  const escotista = LocalStorage.getItem(ESCOTISTA) as IEscotista;
  if (escotista && escotista.codigo === userId) {
    return escotista;
  }
  return null;
}

export function setEscotista (escotista: IEscotista): void {
  LocalStorage.set(ESCOTISTA, escotista);
}

export function getGrupo (
  codigoGrupo: number,
  codigoRegiao: string
): IGrupo | null {
  const grupo = LocalStorage.getItem(GRUPO) as IGrupo;
  if (
    grupo &&
    grupo.codigo == codigoGrupo &&
    grupo.codigoRegiao == codigoRegiao
  ) {
    return grupo;
  }
  return null;
}

export function setGrupo (grupo: IGrupo): void {
  LocalStorage.set(GRUPO, grupo);
}

export function getSecoes (userId: number): Array<ISecao> {
  const secoes = LocalStorage.getItem(`${SECOES}_${userId}`) as Array<ISecao>;
  if (secoes && secoes.length > 0) {
    return secoes;
  }
  return [];
}

export function getSubSecoes (userId: number, codSecao: number): Array<ISubSecao> {
  const subsecoes = LocalStorage.getItem(`${SUBSECOES}_${userId}_${codSecao}`) as Array<ISubSecao>
  if (subsecoes && subsecoes.length > 0) {
    return subsecoes
  }
  return []
}

export function setSecoes (userId: number, secoes: Array<ISecao>) {
  LocalStorage.set(`${SECOES}_${userId}`, secoes);
}

export function setSubSecoes (userId: number, codSecao: number, subsecoes: Array<ISubSecao>) {
  LocalStorage.set(`${SUBSECOES}_${userId}_${codSecao}`, subsecoes)
}

export function clearAllStorage () {
  const cleared: string[] = [];
  LocalStorage.getAllKeys().map(key => {
    if (key.startsWith('MAPPA_')) {
      LocalStorage.remove(key);
      cleared.push(key);
    }
  });
  logger.logDebug('clearAllStorage', cleared);
}

export function getImagem (codigoFoto: number): string {
  return LocalStorage.getItem(`${FOTO}_${codigoFoto}`) as string
}

export function setImagem (codigoFoto: number, imagem: string) {
  LocalStorage.set(`${FOTO}_${codigoFoto}`, imagem)
}

export function getMarcacoes (codigoSecao: number): IMarcacoes | null {
  const marcacoes = LocalStorage.getItem(`${MARCACOES}_${codigoSecao}`) as IMarcacoes
  if (!!marcacoes && dateAgeInSeconds(marcacoes.dataHora) < 300) {
    return marcacoes
  }
  return null;
}

export function setMarcacoes (codigoSecao: number, marcacoes: IMarcacoes) {
  LocalStorage.set(`${MARCACOES}_${codigoSecao}`, marcacoes)
}

export function getProgressoes (codRamo: string): IProgressao[] | null {
  const progressoes = LocalStorage.getItem(`${PROGRESSOES}_${codRamo}`) as IProgressao[]
  return progressoes
}

export function setProgressoes (codRamo: string, progressoes: IProgressao[]) {
  LocalStorage.set(`${PROGRESSOES}_${codRamo}`, progressoes)
}
