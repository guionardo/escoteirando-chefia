export class LoginRequest {
  type = 'LOGIN_REQUEST';
  username = '';
  password = '';

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
