import { LocalStorage } from 'quasar';
import Authorization from 'src/domain/models/authorization';
import {
  IAuthorization,
  IEscotista,
  IGrupo,
  ISecao
} from 'src/domain/models/interfaces';
import { Logger } from './logger';

const ESCOTISTA = 'MAPPA_ESCOTISTA';
const LOGIN = 'MAPPA_LOGIN';
const GRUPO = 'MAPPA_GRUPO';
const SECOES = 'MAPPA_SECOES';

const logger = new Logger('StorageService');

/**
 * Returns valid authorization from LocalStorage
 * @returns
 */
export function getAuth(): IAuthorization | null {
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

export function setAuth(auth: IAuthorization): void {
  LocalStorage.set(LOGIN, auth);
}
export function getEscotista(userId: number): IEscotista | null {
  const escotista = LocalStorage.getItem(ESCOTISTA) as IEscotista;
  if (escotista && escotista.codigo === userId) {
    return escotista;
  }
  return null;
}

export function setEscotista(escotista: IEscotista): void {
  LocalStorage.set(ESCOTISTA, escotista);
}

export function getGrupo(
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

export function setGrupo(grupo: IGrupo): void {
  LocalStorage.set(GRUPO, grupo);
}

export function getSecoes(userId: number): Array<ISecao> {
  const secoes = LocalStorage.getItem(`${SECOES}_${userId}`) as Array<ISecao>;
  if (secoes && secoes.length > 0) {
    return secoes;
  }
  return [];
}

export function setSecoes(userId: number, secoes: Array<ISecao>) {
  LocalStorage.set(`${SECOES}_${userId}`, secoes);
}

export function clearAllStorage() {
  const cleared = [];
  LocalStorage.getAllKeys().map(key => {
    if (key.startsWith('MAPPA_')) {
      LocalStorage.remove(key);
      cleared.push(key);
    }
  });
  logger.logDebug('clearAllStorage', cleared);
}
