import axios from 'axios';
import { proxyURL } from 'src/boot/axios';
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
import { Progressao } from 'src/domain/models/progressao';
import { LoginRequest } from 'src/domain/requests/login_request';
import { ILoginResponse } from 'src/domain/responses';
import { Logger } from './logger';
import { getEscotista, getGrupo, getSecoes, setSecoes, getSubSecoes, setSubSecoes, getImagem, setImagem, getMarcacoes, setMarcacoes, getProgressoes, setProgressoes } from './storage_service';

const logger = new Logger('MAPPA_API');
const USER_AGENT = 'okhttp/3.4.1';
let currentAuth = '';

export function isProxyHealthy (): Promise<boolean> {
  logger.logDebug('Checking proxy health');
  return new Promise((resolve, reject) => {
    axios.get('hc', { baseURL: proxyURL })
      .then(() => {
        resolve(true)
      }).catch(error => {
        logger.logError('Proxy não está disponível', error)
        reject(false)
      })
  })
}
export function setApiAuth (auth: string) {
  currentAuth = auth;
  axios.defaults.headers = {
    'User-Agent': USER_AGENT,
    Authorization: auth
  };
}

export function clearApiAuth () {
  currentAuth = '';
  axios.defaults.headers = {
    'User-Agent': USER_AGENT
  };
}

function ValidateAuth () {
  if (!currentAuth) {
    logger.logWarn('MISSING AUTHORIZATION');
    throw new Error('MISSING AUTHORIZATION');
  }
}

export function mappaLogin (
  username: string,
  password: string
): Promise<IAuthorization> {
  const request = new LoginRequest(username, password).toJson();
  logger.logDebug('Login request', request)
  return new Promise((resolve, reject) => {
    if (!(!!username && !!password)) {
      reject(new Error(`Credenciais inválidas ${JSON.stringify({ username, password })}`))
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

export function mappaGetEscotista (userId: number): Promise<IEscotista> {
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

export function mappaGetGrupo (
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

export function mappaGetSecoes (userId: number): Promise<Array<ISecao>> {
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
        setSecoes(userId, secoes)
        resolve(secoes);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function mappaGetEquipe (userId: number, codSecao: number): Promise<Array<ISubSecao>> {
  return new Promise((resolve, reject) => {
    ValidateAuth();
    let subsecoes = getSubSecoes(userId, codSecao);
    if (subsecoes.length > 0) {
      resolve(subsecoes)
      return
    }
    const filter = { include: 'associados' }
    const url = `/api/escotistas/${userId}/secoes/${codSecao}/equipes?filter=${JSON.stringify(filter)}`
    console.log('getSubSecoes URL', url);
    axios
      .get(url)
      .then(response => {
        subsecoes = response.data as Array<ISubSecao>
        if (subsecoes.length == 0) {
          throw new Error(`No subsections received from userId=${userId}, codSecao=${codSecao}`)
        }
        setSubSecoes(userId, codSecao, subsecoes)
        resolve(subsecoes)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function mappaGetImagem (codImagem: number): Promise<string> {
  return new Promise((resolve, reject) => {
    ValidateAuth()
    let imagem = getImagem(codImagem)
    if (imagem) {
      resolve(imagem)
      return
    }
    const url = `/api/imagens/${codImagem}`
    console.log('getImagem', url)
    axios
      .get(url)
      .then(response => {
        imagem = response.data as string
        console.log(`getImagem ${url}`, imagem)
        setImagem(codImagem, imagem)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function mappaGetMarcacoes (codSecao: number): Promise<IMarcacoes> {
  return new Promise((resolve, reject) => {
    ValidateAuth()
    let marcacoes = getMarcacoes(codSecao)
    if (marcacoes) {
      resolve(marcacoes)
      return
    }
    const ultimaAtualizacao = '1970-01-01T00:00:00.000.Z' //TODO: Implementar lógica para obter as marcações de forma atualizada
    const url = `/api/marcacoes/v2/updats?dataHoraUltimaAtualizacao=${ultimaAtualizacao}&codigoSecao=${codSecao}`
    axios
      .get(url)
      .then(response => {
        marcacoes = response.data as IMarcacoes
        logger.logInfo('mappaGetMarcacoes', marcacoes)
        setMarcacoes(codSecao, marcacoes)
        resolve(marcacoes)
      }).catch(error => {
        reject(error)
      })
  })
}

export function mappaGetProgressoes (codRamo: string): Promise<IProgressao[]> {
  return new Promise((resolve, reject) => {
    ValidateAuth()
    let progressoes = getProgressoes(codRamo)
    if (progressoes) {
      resolve(progressoes)
      return
    }
    const caminhos = codRamo == 'A' ? [1, 2, 3] : codRamo == 'E' ? [4, 5, 6] : codRamo == 'S' ? [11, 12] : codRamo == 'P' ? [15, 16] : [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 17, 18, 19, 20]
    const filter = { where: { numeroGrupo: null, codigoRegiao: null, codigoCaminho: { inq: caminhos } } }

    axios
      .get('/api/progressao-atividades?filter=' + JSON.stringify(filter))
      .then(response => {
        progressoes = (response.data as IProgressao[]).map(p => new Progressao(p))
        logger.logInfo('mappaGetProgressoes', progressoes)
        setProgressoes(codRamo, progressoes)
        resolve(progressoes)
      }).catch(error => {
        reject(error)
      })
  })
}