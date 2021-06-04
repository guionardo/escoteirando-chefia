import {
  IAuthorization,
  IEscotista,
  IGrupo,
  ISecao,  
  ILoginRequest,
  ISubSecao
} from 'src/domain/models/interfaces';
import { Logger } from 'src/services/logger';
import {
  mappaGetEscotista,
  mappaGetGrupo,
  mappaGetSecoes,
  mappaGetEquipe,
  mappaLogin,
  setApiAuth
} from 'src/services/mappa_api';
import { clearAllStorage, getAuth, setAuth } from 'src/services/storage_service';
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
  codigo: 0,
  codigoRegiao: 'ZZ',
  nome: '',
  codigoModalidade: 0
};
const emptySecao: ISecao = {
  codigo: 1,
  codigoRegiao: 'ZZ',
  codigoGrupo: 0,
  codigoTipoSecao: 1,
  nome: ''
};

@Module({ name: 'MappaStoreModule' })
export default class MappaStoreModule extends VuexModule {
  auth: IAuthorization | null = getAuth();
  escotista: IEscotista = emptyEscotista;
  grupo: IGrupo = emptyGrupo;
  secao: ISecao = emptySecao;
  secoes: Array<ISecao> = []
  equipes:Array<ISubSecao>=[]

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
    setAuth(auth)
    await this.reloadUser(auth.userId);

    logger.logInfo('User loaded from localStorage');
  }

  @Action
  login(loginRequest:ILoginRequest): boolean {
    const username=loginRequest.username
    const password=loginRequest.password    
    mappaLogin(username, password)
      .then(async response => {
        setApiAuth(response.auth);
        setAuth(response)
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
    clearAllStorage()
  }

  @Action
  async reloadUser(userId: number) {
    try {
      const escotista = await mappaGetEscotista(userId);
      const grupo = await mappaGetGrupo(
        escotista.codigoGrupo,
        escotista.codigoRegiao
      );
      const secoes = await mappaGetSecoes(userId)      
      for(let i=0;i<secoes.length;i++)      {
        const equipe = await mappaGetEquipe(userId,secoes[i].codigo)
        secoes[i].SubSecoes = equipe        
      }
      
      this.SET_ESCOTISTA(escotista);
      this.SET_GRUPO(grupo);
      this.SET_SECOES(secoes)      
    } catch (error) {
      this.CLEAR_ALL();
      logger.logError(`ReloadUser userId:${userId}`, error);
    }
  }

  @Action
  setSecaoAtiva(secao:ISecao){
    this.SET_SECAO(secao)
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

  @Mutation
  SET_SECOES(secoes: Array<ISecao>){
    this.secoes = secoes
  }

  @Mutation
  SET_EQUIPES(equipes:Array<ISubSecao>){
    this.equipes=equipes
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

  get getSecoes():ISecao[]{
    return this.secoes
  }

  get getSecaoAtiva():ISecao{
    return this.secao
  }
}
