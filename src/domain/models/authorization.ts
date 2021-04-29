import { ILoginResponse } from '../responses';
import { IAuthorization } from '../models/interfaces';
import { Logger } from 'src/services/logger';

const logger = new Logger('Authorization');

export default class Authorization implements IAuthorization {
  auth: string;
  validUntil: Date;
  id: string;
  ttl: number;
  created: Date;
  userId: number;

  constructor(payload: ILoginResponse) {
    this.id = payload.id;
    this.ttl = payload.ttl;
    this.created = payload.created;
    this.userId = payload.userId;
    this.auth = payload.id;
    this.validUntil = new Date(
      new Date(payload.created).getTime() + payload.ttl * 1000
    );
  }

  static FakeAuth(): IAuthorization {
    const payload: ILoginResponse = {
      created: new Date(),
      id: '1',
      ttl: 86400,
      userId: 1
    };
    const auth = new Authorization(payload);
    logger.logDebug('FakeAuth', auth);
    return auth;
  }
}
