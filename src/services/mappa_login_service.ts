import { MappaRequestService } from './mappa_request_service';
import { MappaLogin } from 'src/store/MappaLoginModule';
import { LoginRequest } from 'src/domain/requests/login_request';
import { ILoginResponse } from 'src/domain/responses';
import { IEscotista, IGrupo } from 'src/domain/models/interfaces';
import { getEscotista, getGrupo } from './storage_service';

export class MappaLoginService extends MappaRequestService {
  login(username: string, password: string): Promise<ILoginResponse> {
    return new Promise((resolve, reject) => {
      const request = new LoginRequest(username, password);
      this.post('/api/escotistas/login', request)
        .then(response => {
          const loginResponse = response.data as ILoginResponse;
          MappaLogin.setAuth(loginResponse);
          resolve(loginResponse);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  logout() {
    MappaLogin.clearAuth();
  }

  getEscotista(userId: number): Promise<IEscotista> {
    return new Promise((resolve, reject) => {
      const escotista = getEscotista(userId);
      if (escotista) {
        resolve(escotista);
      } else {
        this.get(`/api/escotistas/${userId}`)
          .then(response => {
            const escotistaResponse = response.data as IEscotista;
            MappaLogin.setEscotista(escotistaResponse);
            resolve(escotistaResponse);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  getGrupo(codigoGrupo: number, codigoRegiao: string): Promise<IGrupo> {
    return new Promise((resolve, reject) => {
      const grupo = getGrupo(codigoGrupo, codigoRegiao);
      if (grupo) {
        resolve(grupo);
      } else {
        const filter = {
          filter: {
            where: {
              codigo: codigoGrupo,
              codigoRegiao: codigoRegiao
            }
          }
        };
        this.get('/api/grupos', {}, filter)
          .then(response => {              
            const grupoResponse = (response.data as Array<IGrupo>)[0];
            MappaLogin.setGrupo(grupoResponse);
            resolve(grupoResponse);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }
}

export const MappaLoginServiceInstance = new MappaLoginService();
