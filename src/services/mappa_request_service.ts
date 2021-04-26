import axios from 'axios';
import { IEscotista, IGrupo } from 'src/domain/models/interfaces';
import { MappaLogin } from 'src/store/MappaLoginModule';
import { Logger } from './logger';

export interface IAjaxRequest {
  method: string;
  url: string;
  data: unknown;
}

export interface IAjaxResponse {
  statusCode: number;
  data: unknown;
  message: string;
  success: boolean;
  request: IAjaxRequest;
}

export class MappaRequestService extends Logger {
  /**
   * GET request
   * @param url
   * @param data
   * @returns Promise<unknown>
   */
  get(url: string, data = {}, json = {}): Promise<IAjaxResponse> {
    return new Promise((resolve, reject) => {
      if (!MappaLogin.isLogged) {
        const response: IAjaxResponse = {
          statusCode: 401,
          data: null,
          message: 'MAPPA AUTHORIZATION IS MISSING',
          request: {
            method: 'GET',
            data: data,
            url: url
          },
          success: false
        };
        this.logError('GET', response);
        reject(response);
        return;
      }
      // Encoding query data
      const ret = [];
      for (const d in data) {
        ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
      }
      const query = ret.length == 0 ? '' : '?' + ret.join('&');
      let request;
      if (json) {
        request = axios.get(url + query, { params: json });
      } else {
        request = axios.get(url + query);
      }
      request
        .then(response => {
          const newResponse: IAjaxResponse = {
            data: response.data,
            message: response.statusText,
            statusCode: response.status,
            success: response.status > 0 && response.status < 400,
            request: {
              data: data,
              method: 'GET',
              url: url
            }
          };
          this.logDebug('GET', newResponse);
          resolve(newResponse);
        })
        .catch(error => {
          const errResponse: IAjaxResponse = {
            data: error.response.data,
            message: error.response.statusText,
            statusCode: error.response.status,
            success: false,
            request: {
              data: data,
              method: 'GET',
              url: url
            }
          };
          this.logError('GET', errResponse);
          reject(errResponse);
        });
    });
  }
  /**
   * POST
   * @param url
   * @param data
   * @returns Promise<unknown>
   */
  post(url: string, data = {}): Promise<IAjaxResponse> {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(response => {
          const newResponse: IAjaxResponse = {
            data: response.data,
            message: response.statusText,
            statusCode: response.status,
            success: response.status > 0 && response.status < 400,
            request: {
              data: data,
              method: 'POST',
              url: url
            }
          };
          this.logDebug('POST', newResponse);
          resolve(newResponse);
        })
        .catch(error => {
          const errResponse: IAjaxResponse = {
            data: error.response.data,
            message: error.response.statusText,
            statusCode: error.response.status,
            success: false,
            request: {
              data: data,
              method: 'POST',
              url: url
            }
          };
          this.logError('POST', errResponse);
          reject(errResponse);
        });
    });
  }
}
