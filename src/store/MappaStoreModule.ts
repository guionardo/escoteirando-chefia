import {
  IAuthorization,
  IEscotista,
  IGrupo,
  ISecao
} from 'src/domain/models/interfaces';
import { Logger } from 'src/services/logger';
import {
  mappaGetEscotista,
  mappaGetGrupo,
  mappaLogin,
  setApiAuth
} from 'src/services/mappa_api';
import { getAuth } from 'src/services/storage_service';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

const NAO_LOGADO = 'Usuário não logado';
const logger = new Logger('MappaStore');
const emptyAuth: IAuthorization = {
  auth: '',
  created: new Date(0),
  id: '',
  ttl: 0,
  userId: 0,
  validUntil: new Date(0)
};
const emptyEscotista: IEscotista = {
  ativo: '',
  codigo: 0,
  codigoAssociado: 0,
  codigoFoto: 0,
  codigoGrupo: 0,
  codigoRegiao: '',
  nomeCompleto: 'Guionardo',
  username: 'guionardo'
};
const emptyGrupo: IGrupo = {
  codigo: 32,
  codigoRegiao: 'SC',
  nome: 'TESTE Leões de Blumenau',
  codigoModalidade: 0
};
const emptySecao: ISecao = {
  codigo: 1,
  codigoRegiao: 'SC',
  codigoGrupo: 32,
  codigoTipoSecao: 1,
  nome: 'Alcatéia 1'
};

@Module({ name: 'MappaStoreModule' })
export default class MappaStoreModule extends VuexModule {
  auth: IAuthorization | null = getAuth();
  escotista: IEscotista = emptyEscotista;
  grupo: IGrupo = emptyGrupo;
  secao: ISecao = emptySecao;

  @Action
  async getAuthFromLocalStorage() {
    const auth = getAuth();
    if (!auth) {
      logger.logInfo('No local authorization found');
      this.SET_AUTH(emptyAuth);
      this.SET_ESCOTISTA(emptyEscotista);
      this.SET_GRUPO(emptyGrupo);
      this.SET_SECAO(emptySecao);
      return;
    }
    this.SET_AUTH(auth);
    setApiAuth(auth.id);
    await this.reloadUser(auth.userId);

    logger.logInfo('User loaded from localStorage');
  }

  @Action
  login(username: string, password: string): boolean {
    mappaLogin(username, password)
      .then(async response => {
        setApiAuth(response.auth);
        this.SET_AUTH(response);
        await this.reloadUser(response.userId);
        return true;
      })
      .catch(error => {
        this.CLEAR_ALL();
        logger.logError('Login', error);
      });
    return false;
  }

  @Action
  logout() {
    this.CLEAR_ALL();
  }

  @Action
  async reloadUser(userId: number) {
    try {
      const escotista = await mappaGetEscotista(userId);
      const grupo = await mappaGetGrupo(
        escotista.codigoGrupo,
        escotista.codigoRegiao
      );
      this.SET_ESCOTISTA(escotista);
      this.SET_GRUPO(grupo);
    } catch (error) {
      this.CLEAR_ALL();
      logger.logError(`ReloadUser userId:${userId}`, error);
    }
  }

  @Mutation
  CLEAR_ALL() {
    this.auth = emptyAuth;
    this.escotista = emptyEscotista;
    this.grupo = emptyGrupo;
    this.secao = emptySecao;
  }

  @Mutation
  SET_AUTH(auth: IAuthorization) {
    this.auth = auth;
  }

  @Mutation
  SET_ESCOTISTA(escotista: IEscotista) {
    this.escotista = escotista;
  }

  @Mutation
  SET_GRUPO(grupo: IGrupo) {
    this.grupo = grupo;
  }

  @Mutation
  SET_SECAO(secao: ISecao) {
    this.secao = secao;
  }

  get isAuthorized(): boolean {
    return !!this.auth?.auth && this.auth?.validUntil > new Date();
  }

  get userName(): string {
    return this.isAuthorized
      ? this.escotista.nomeCompleto || this.escotista.username
      : NAO_LOGADO;
  }
  get grupoNome(): string {
    const gc = this.grupo.codigo;
    const cr = this.grupo.codigoRegiao;
    const cn = this.grupo.nome;
    return this.isAuthorized ? `${gc}/${cr} ${cn}` : NAO_LOGADO;
  }
  get secaoNome(): string {
    return this.isAuthorized ? `${this.secao.nome}` : NAO_LOGADO;
  }
}
