import { LocalStorage } from 'quasar';
import {
  IAuthorization,
  IEscotista,
  IGrupo
} from 'src/domain/models/interfaces';

const ESCOTISTA = 'MAPPA_ESCOTISTA';
const LOGIN = 'MAPPA_LOGIN';
const GRUPO = 'MAPPA_GRUPO';

export function getAuth(): IAuthorization | null {
  const auth = LocalStorage.getItem(LOGIN) as IAuthorization;
  if (auth && auth.validUntil > new Date()) {
    return auth;
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
