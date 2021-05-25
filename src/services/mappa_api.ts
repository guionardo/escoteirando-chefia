import axios from 'axios';
import Authorization from 'src/domain/models/authorization';
import {
  IAuthorization,
  IEscotista,
  IGrupo,
  ISecao
} from 'src/domain/models/interfaces';
import { LoginRequest } from 'src/domain/requests/login_request';
import { ILoginResponse } from 'src/domain/responses';
import { Logger } from './logger';
import { getEscotista, getGrupo, getSecoes } from './storage_service';

const logger = new Logger('MAPPA_API');
const USER_AGENT = 'okhttp/3.4.1';
let currentAuth = '';
export function setApiAuth(auth: string) {
  currentAuth = auth;
  axios.defaults.headers = {
    'User-Agent': USER_AGENT,
    Authorization: auth
  };
}

export function clearApiAuth() {
  currentAuth = '';
  axios.defaults.headers = {
    'User-Agent': USER_AGENT
  };
}

function ValidateAuth() {
  if (!currentAuth) {
    logger.logWarn('MISSING AUTHORIZATION');
    throw new Error('MISSING AUTHORIZATION');
  }
}

export function mappaLogin(
  username: string,
  password: string
): Promise<IAuthorization> {
  const request = new LoginRequest(username, password).toJson();
  logger.logDebug('Login request',request)
  return new Promise((resolve, reject) => {
    if (!(!!username && !!password)){
      reject(new Error(`Credenciais inválidas ${JSON.stringify({username,password})}`))
      return
    }
    
    axios
      .post('login', request)      
      .then(response => {
        const loginResponse = response?.data as ILoginResponse;
        logger.logInfo('LOGIN OK', loginResponse);
        resolve(new Authorization(loginResponse));
      })
      .catch(error => {
        logger.logError('LOGIN FAILED', error);
        reject(error);
      });
  });
}

export function mappaGetEscotista(userId: number): Promise<IEscotista> {
  return new Promise((resolve, reject) => {
    ValidateAuth();
    const escotista = getEscotista(userId);
    if (escotista) {
      resolve(escotista);
    } else {
      axios
        .get(`/api/escotistas/${userId}`)
        .then(response => {
          const escotistaResponse = response.data as IEscotista;
          resolve(escotistaResponse);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
}

export function mappaGetGrupo(
  codigoGrupo: number,
  codigoRegiao: string
): Promise<IGrupo> {
  return new Promise((resolve, reject) => {
    ValidateAuth();
    const grupo = getGrupo(codigoGrupo, codigoRegiao);
    if (grupo) {
      resolve(grupo);
    } else {
      const filter = {
        where: {
          codigo: codigoGrupo,
          codigoRegiao: codigoRegiao
        }
      };
      // api/grupos?filter={%22where%22:%20{%22codigo%22:%2032,%20%22codigoRegiao%22:%20%22SC%22}}
      const url = '/api/grupos?filter=' + JSON.stringify(filter);
      console.log('getGrupo URL', url);
      axios
        .get('/api/grupos?filter=' + JSON.stringify(filter))
        .then(response => {
          const grupoResponse = response.data as Array<IGrupo>;
          if (grupoResponse.length == 0) {
            throw new Error(
              `No group received codigo=${codigoGrupo} / codigoRegiao=${codigoRegiao}`
            );
          }
          resolve(grupoResponse[0]);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
}

export function mappaGetSecoes(userId: number): Promise<Array<ISecao>> {
  return new Promise((resolve, reject) => {
    ValidateAuth();
    let secoes = getSecoes(userId);
    if (secoes.length > 0) {
      resolve(secoes);
      return;
    }
    const url = `/api/escotistas/${userId}/secoes`;
    axios
      .get(url)
      .then(response => {
        secoes = response.data as Array<ISecao>;
        if (secoes.length == 0) {
          throw new Error(`No sections received from userId=${userId}`);
        }
        resolve(secoes);
      })
      .catch(error => {
        reject(error);
      });
  });
}
/*
  def get_secoes(self, login: Login) -> List[Secao]:
        if not self._mappa._set_auth(login):
            return
        response = self._http.get(f'/api/escotistas/{login.userId}/secoes')

        secoes = []
        if response.is_ok:
            try:
                for secao in response.content:
                    secoes.append(Secao(**secao))
            except Exception as exc:
                self.LOG.error('ERROR PARSING SECOES %s - %s',
                               response.content, str(exc))

        return secoes
        */
