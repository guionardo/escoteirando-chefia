import { storeInstance } from './index';

import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators';

import { setAxiosAuth } from 'src/boot/axios';
import Authorization from 'src/domain/models/authorization';
import {  
  IEscotista,
  IGrupo,
  ISecao
} from 'src/domain/models/interfaces';
import { ILoginResponse } from 'src/domain/responses';
import { setEscotista, getAuth } from 'src/services/storage_service';

const MAPPA_LOGIN = 'MAPPA_LOGIN';
const NAO_LOGADO = 'Usuário não logado';

function getAuthFromStore(): Authorization {
  let localAuth = getAuth();
  if (localAuth) {
    console.log('getAuthFromStore', localAuth);
    return localAuth;
  }
  localAuth = {
    auth: '',
    created: new Date(0),
    id: '',
    ttl: 0,
    userId: 0,
    validUntil: new Date(0)
  };

  return new Authorization(localAuth);
}
function setAuthIntoStore(auth: Authorization) {
  window.localStorage.setItem(MAPPA_LOGIN, JSON.stringify(auth));
}

@Module({
  dynamic: true,
  store: storeInstance,
  namespaced: true,
  name: 'MappaLoginModule'
})
class MappaLoginModule extends VuexModule {
  auth: Authorization = getAuthFromStore();
  escotista: IEscotista = {
    ativo: '',
    codigo: 0,
    codigoAssociado: 0,
    codigoFoto: 0,
    codigoGrupo: 0,
    codigoRegiao: '',
    nomeCompleto: 'Guionardo Furlan',
    username: 'guionardo'
  };
  grupo: IGrupo = {
    codigo: 32,
    codigoRegiao: 'SC',
    nome: 'Leões de Blumenau',
    codigoModalidade: 0
  };
  secao: ISecao = {
    codigo: 1,
    codigoRegiao: 'SC',
    codigoGrupo: 32,
    codigoTipoSecao: 1,
    nome: 'Alcatéia 1'
  };

  @Mutation
  SET_AUTH(payload: ILoginResponse) {
    this.auth = new Authorization(payload);
    console.log('SET_AUTH', payload);
    setAuthIntoStore(this.auth);
  }

  @Action
  setAuth(payload: ILoginResponse) {
    this.SET_AUTH(payload);
    setAxiosAuth(payload.id);
  }

  @Action
  clearAuth() {
    const emptyResponse: ILoginResponse = {
      id: '',
      ttl: 0,
      created: new Date(0),
      userId: 0,      
    };
    this.SET_AUTH(emptyResponse);
  }

  @Action
  setEscotista(escotista: IEscotista) {
    this.SET_ESCOTISTA(escotista);
  }
  @Mutation
  SET_ESCOTISTA(escotista: IEscotista) {
    setEscotista(escotista);
    this.escotista = escotista;
  }
  get isLogged(): boolean {
    return !!this.auth.auth && this.auth.validUntil > new Date();
  }

  get userName(): string {
    return this.isLogged
      ? this.escotista.nomeCompleto || this.escotista.username
      : NAO_LOGADO;
  }
  get grupoNome(): string {
    return this.isLogged
      ? `${this.grupo.codigo}/${this.grupo.codigoRegiao} ${this.grupo.nome}`
      : NAO_LOGADO;
  }
  get secaoNome(): string {
    return this.isLogged ? `${this.secao.nome}` : NAO_LOGADO;
  }
}

export const MappaLogin = getModule(MappaLoginModule);
